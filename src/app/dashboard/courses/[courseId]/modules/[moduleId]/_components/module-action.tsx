"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { toast } from "sonner";

import {
  changeModulePublishStateAction,
  deleteModuleAction,
} from "@/actions/module-actions";
import type { IModuleFrontend } from "@/validators/frontend-types";
import { useRouter } from "next/navigation";

interface ModuleActionsProps {
  moduleDetails: IModuleFrontend;
  courseId: string;
}

export const ModuleActions = ({
  moduleDetails,
  courseId,
}: ModuleActionsProps) => {
  const [action, setAction] = useState<null | "change-active" | "delete">(null);
  const [published, setPublished] = useState(moduleDetails?.active);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      switch (action) {
        case "change-active": {
          const result = await changeModulePublishStateAction(moduleDetails.id);

          if (!result.success) {
            toast.error(result.error);
            break;
          }

          if (typeof result.data !== "boolean") {
            toast.error("Failed to update module state");
            break;
          }

          setPublished(result.data);
          toast.success("The module has been updated successfully.");
          router.refresh();
          break;
        }

        case "delete": {
          if (published) {
            toast.error(
              "A published module can not be deleted. First unpublish it, then delete.",
            );
          } else {
            const result = await deleteModuleAction({
              moduleId: moduleDetails.id,
              courseId,
            });

            if (!result.success) {
              toast.error(result.error);
              break;
            }

            // router.refresh();
            router.push(`/dashboard/courses/${courseId}`);
          }
          break;
        }

        default: {
          throw new Error("Invalid Module Action");
        }
      }
    } catch (error: unknown) {
      console.error("Error handling module action:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          type="submit"
          size="sm"
          onClick={() => setAction("change-active")}
        >
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size="sm" type="submit" onClick={() => setAction("delete")}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
