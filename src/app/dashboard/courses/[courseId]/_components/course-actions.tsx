"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { changeCoursePublishState, deleteCourse } from "@/actions/course-actions";

import { toast } from "sonner";

import { catchError } from "@/lib/catch-error";
import { useRouter } from "next/navigation";

interface CourseActionsProps {
  courseId: string;
  isActive: boolean;
}

export const CourseActions = ({ courseId, isActive }: CourseActionsProps) => {
  const router = useRouter();
  const [action, setAction] = useState<"change-active" | "delete" | null>(null);
  const [published, setPublished] = useState(isActive);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const result = await changeCoursePublishState(courseId);

          if (!result.success) {
            toast.error(result.error);
            break;
          }

          if (typeof result.data !== "boolean") {
            toast.error("Failed to update course state");
            break;
          }

          setPublished(result.data);
          toast.success("The course has been updated successfully.");
          router.refresh();
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published course can not be deleted. First unpublish it, then delete.",
            );
          } else {
            const result = await deleteCourse(courseId);

            if (!result.success) {
              toast.error(result.error);
              break;
            }

            toast.success("The course has been deleted successfully");
            router.push(`/dashboard/courses/`);
          }

          break;
        }

        default: {
          throw new Error("Invalid Course Action");
        }
      }
    } catch (error: unknown) {
      toast.error(catchError(error));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button
          type="button"
          name="action"
          value="delete"
          size="sm"
          onClick={() => setAction("delete")}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
