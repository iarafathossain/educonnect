import { IconBadge } from "@/components/icon-badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getModule } from "@/queries/modules";
import {
  AlertTriangleIcon,
  ArrowLeft,
  BookOpenCheck,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { LessonForm } from "./_components/lesson-form";
import { ModuleActions } from "./_components/module-action";
import { ModuleTitleForm } from "./_components/module-title-form";

interface ModulePageParams {
  params: {
    courseId: string;
    moduleId: string;
  };
}

const ModulePage = async ({
  params: { courseId, moduleId },
}: ModulePageParams) => {
  const moduleDetails = await getModule(moduleId);
  const sortedModuleLessons = moduleDetails.lessonIds.sort(
    (a: { order: number }, b: { order: number }) => a.order - b.order,
  );

  return (
    <>
      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 rounded-none">
        <AlertTriangleIcon />
        <AlertTitle>
          This module is unpublished. It will not be visible in the course.
        </AlertTitle>
      </Alert>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-end">
              <ModuleActions
                moduleDetails={moduleDetails}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} variant="default" size="md" />
                <h2 className="text-xl">Customize Your module</h2>
              </div>
              <ModuleTitleForm
                initialData={{ title: moduleDetails?.title }}
                moduleId={moduleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} variant="default" size="md" />
                <h2 className="text-xl">Module Lessons</h2>
              </div>
              <LessonForm
                initialData={sortedModuleLessons}
                moduleId={moduleId}
                courseId={courseId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2> */}
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulePage;
