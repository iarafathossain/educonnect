"use client";

// import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateQuizSetAction } from "@/actions/quiz-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  quizSetUpdateZodSchema,
  TQuizSetUpdatePayload,
} from "@/validators/quiz-set-validator";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type TitleFormValues = TQuizSetUpdatePayload;

interface TitleFormProps {
  initialData: {
    title: string;
  };
  quizSetId: string;
}

export const TitleForm = ({ initialData, quizSetId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<TQuizSetUpdatePayload>({
    resolver: zodResolver(quizSetUpdateZodSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: TitleFormValues) => {
    const result = await updateQuizSetAction(quizSetId, values);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toggleEdit();
    toast.success("Quiz set title updated successfully");
    router.refresh();
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz set title
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
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
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
