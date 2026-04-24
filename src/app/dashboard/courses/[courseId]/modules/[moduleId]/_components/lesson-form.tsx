"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createLessonAction,
  reorderLessonsAction,
} from "@/actions/lesson-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSlug } from "@/lib/get-slug";
import { cn } from "@/lib/utils";
import { ILessonFrontend } from "@/types/frontend-index";
import { IReorderItem } from "@/types/shared-index";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LessonList } from "./lesson-list";
import { LessonModal } from "./lesson-modal";

const formSchema = z.object({
  title: z.string().min(1),
});

interface LessonFormProps {
  initialData: ILessonFrontend[];
  moduleId: string;
  courseId: string;
}

export const LessonForm = ({
  initialData,
  moduleId,
  courseId,
}: LessonFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lessons, setLessons] = useState(initialData);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [lessonToEdit, setLessonToEdit] = useState<ILessonFrontend>(
    {} as ILessonFrontend,
  );

  const toggleCreating = () => setIsCreating((current) => !current);
  const toggleEditing = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createLessonAction({
      title: values.title,
      slug: getSlug(values.title),
      moduleId,
      order: lessons.length,
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    if (!result.data) {
      toast.error("Failed to create lesson");
      return;
    }

    setLessons((currentLessons) => [
      ...currentLessons,
      {
        id: result.data.id,
        title: values.title,
        slug: getSlug(values.title),
      },
    ]);
    toast.success("Lesson created");
    toggleCreating();
    router.refresh();
  };

  const onReorder = async (updateData: IReorderItem[]) => {
    try {
      setIsUpdating(true);

      const result = await reorderLessonsAction(updateData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Lesson reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const foundLesson = lessons.find((lesson) => lesson.id === id);
    if (foundLesson) {
      setLessonToEdit(foundLesson);
      toggleEditing();
    } else {
      toast.error("Lesson not found");
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
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
            !lessons?.length && "text-slate-500 italic",
          )}
        >
          {!lessons?.length && "No lessons"}
          <LessonList
            onEdit={onEdit}
            onReorder={onReorder}
            lessonList={lessons || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & Drop to reorder the modules
        </p>
      )}
      <LessonModal
        open={isEditing}
        setOpen={setIsEditing}
        lesson={lessonToEdit}
        courseId={courseId}
        moduleId={moduleId}
        onClose={() => window.location.reload()}
      />
    </div>
  );
};
