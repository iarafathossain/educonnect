import { IconBadge } from "@/components/icon-badge";
import { getCategories } from "@/queries/categories";
import { getCourse } from "@/queries/courses";
import {
  AlertTriangleIcon,
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { CategoryForm } from "./_components/category-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { IModuleFrontend } from "@/types/frontend-index";
import { CourseActions } from "./_components/course-actions";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { QuizSetForm } from "./_components/quiz-set-form";
import { TitleForm } from "./_components/title-form";

const EditCoursePage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const course = await getCourse(courseId);

  if (!course) {
    return (
      <Alert className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50 rounded-none shadow-lg">
        <AlertTriangleIcon />
        <AlertTitle>Course not found.</AlertTitle>
      </Alert>
    );
  }

  const categories = await getCategories();

  const sortedModules: IModuleFrontend[] = course.modules
    ? course.modules.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order,
      )
    : [];

  return (
    <>
      <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50 rounded-none shadow-lg">
        <AlertTriangleIcon />
        <AlertTitle>
          This course is unpublished. It will not be visible in the course.
        </AlertTitle>
      </Alert>
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions courseId={courseId} isActive={course?.active} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} variant="default" size="md" />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course.title,
              }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{ description: course.description }}
              courseId={courseId}
            />
            <ImageForm
              initialData={{
                imageUrl: course?.thumbnailUrl,
              }}
              courseId={courseId}
            />
            <CategoryForm
              initialData={{ value: course?.category?.value }}
              courseId={courseId}
              options={categories}
            />

            <QuizSetForm initialData={{}} courseId={courseId} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} variant="default" size="md" />
                <h2 className="text-xl">Course Modules</h2>
              </div>

              <ModulesForm initialData={sortedModules} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge
                  icon={CircleDollarSign}
                  variant="default"
                  size="md"
                />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm
                initialData={{ price: course.price }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoursePage;
