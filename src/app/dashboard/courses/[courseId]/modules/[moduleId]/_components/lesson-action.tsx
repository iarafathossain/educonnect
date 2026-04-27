"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import { toast } from "sonner";

import {
  changeLessonPublishStateAction,
  deleteLessonAction,
} from "@/actions/lesson-actions";
import type { ILessonFrontend } from "@/validators/frontend-types";

interface LessonActionsProps {
  lesson: ILessonFrontend;
  moduleId: string;
  onDelete: () => void;
}

export const LessonActions = ({
  lesson,
  moduleId,
  onDelete,
}: LessonActionsProps) => {
  const [action, setAction] = useState<"change-active" | "delete" | null>(null);
  const [published, setPublished] = useState(lesson?.active);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const result = await changeLessonPublishStateAction(lesson.id);

          if (!result.success) {
            toast.error(result.error);
            break;
          }

          if (typeof result.data !== "boolean") {
            toast.error("Failed to update lesson state");
            break;
          }

          setPublished(result.data);
          toast.success("The lesson has been updated");
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published lesson can not be deleted. First unpublish it, then delete.",
            );
          } else {
            const result = await deleteLessonAction({
              lessonId: lesson.id,
              moduleId,
            });

            if (!result.success) {
              toast.error(result.error);
              break;
            }

            onDelete();
          }
          break;
        }

        default: {
          throw new Error("Invalid Lesson Action");
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
