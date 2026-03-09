"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { toast } from "sonner";

import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { catchError } from "@/lib/catch-error";
import { IModuleFrontend } from "@/types/frontend-index";
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
          const activeState = await changeModulePublishState(moduleDetails.id);

          setPublished(!activeState);
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
            await deleteModule(moduleDetails.id, courseId);
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
      toast.error(catchError(error));
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
