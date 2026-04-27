"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createModuleAction,
  reorderModulesAction,
} from "@/actions/module-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { catchError } from "@/lib/catch-error";
import { getSlug } from "@/lib/get-slug";
import { cn } from "@/lib/utils";
import type { IModuleFrontend } from "@/validators/frontend-types";
import type { IReorderItem } from "@/validators/frontend-types";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ModuleList } from "./module-list";

const formSchema = z.object({
  title: z.string().min(1),
});

interface ModulesFormProps {
  initialData: IModuleFrontend[];
  courseId: string;
}

export const ModulesForm = ({ initialData, courseId }: ModulesFormProps) => {
  const [modules, setModules] = useState(initialData);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createModuleAction({
      title: values.title,
      courseId,
      slug: getSlug(values.title),
      order: modules.length,
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    if (!result.data) {
      toast.error("Failed to create module");
      return;
    }

    setModules((currentModules) => [
      ...currentModules,
      {
        id: result.data.id,
        title: values.title,
        order: currentModules.length,
        active: result.data.active,
        courseId,
        slug: getSlug(values.title),
        lessonIds: [],
        duration: 0,
      },
    ]);
    toast.success("Module created successfully!");
    toggleCreating();
    router.refresh();
  };

  const onReorder = async (updateData: IReorderItem[]) => {
    try {
      const result = await reorderModulesAction(updateData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setIsUpdating(true);

      toast.success("Chapters reordered");
      router.refresh();
    } catch (error: unknown) {
      toast.error(catchError(error));
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/dashboard/courses/${courseId}/modules/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Modules
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a module
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !modules?.length && "text-slate-500 italic",
          )}
        >
          {!modules?.length && "No module"}
          <ModuleList
            onEdit={onEdit}
            onReorder={onReorder}
            items={modules || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & Drop to reorder the modules
        </p>
      )}
    </div>
  );
};
