"use client";
import { createQuizSetAction } from "@/actions/quiz-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  quizSetCreateZodSchema,
  TQuizSetCreatePayload,
} from "@/validators/quiz-set-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddQuizSet = () => {
  const router = useRouter();

  const form = useForm<TQuizSetCreatePayload>({
    resolver: zodResolver(quizSetCreateZodSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: TQuizSetCreatePayload) => {
    const result = await createQuizSetAction(values);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    if (!result.data) {
      toast.error("Something went wrong");
      return;
    }

    router.push(`/dashboard/quiz-sets/${result.data}`);
    toast.success("Quiz Set Created");
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div className="max-w-full w-[536px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Set Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Reactive Accelerator'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/dashboard/quiz-sets">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddQuizSet;
