import { ICourseFrontend } from "@/types/frontend-index";
import { Accordion } from "@radix-ui/react-accordion";
import { BookCheck, Clock10 } from "lucide-react";
import CourseModuleList from "./module/course-module";

const CourseCurriculum = ({ course }: { course: ICourseFrontend }) => {
  const totalDuration = course?.modules.reduce(function (acc, obj) {
    return acc + Number(obj.duration);
  }, 0);
  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {(totalDuration / 60).toPrecision(2)} Hours
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        className="w-full"
      >
        {course?.modules &&
          course?.modules.map((module) => (
            <CourseModuleList key={module.id} module={module} />
          ))}
      </Accordion>
    </>
  );
};

export default CourseCurriculum;
