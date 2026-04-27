import { IconBadge } from "@/components/icon-badge";
import { getCourse } from "@/services/course-services";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { CategoryForm } from "./_components/category-form";

import AlertBanner from "@/components/alert-banner";
import { courseCategories } from "@/constants/data";
import type { IModuleFrontend } from "@/validators/frontend-types";
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
    return <AlertBanner label="Course not found." variant="warning" />;
  }

  const sortedModules: IModuleFrontend[] = course.modules
    ? course.modules.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order,
      )
    : [];

  return (
    <>
      <AlertBanner
        label="This course is unpublished. It will not be visible in the course."
        variant="warning"
      />
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
                imageUrl: course?.image,
              }}
              courseId={courseId}
            />
            <CategoryForm
              initialData={{ value: course?.category?.value }}
              courseId={courseId}
              options={courseCategories}
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
