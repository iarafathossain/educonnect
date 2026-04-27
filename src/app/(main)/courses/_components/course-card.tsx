import CardImage from "@/components/card-image";
import EnrollCourse from "@/components/enroll-course";
import { formatPrice } from "@/lib/formate-price";
import { ICourseFrontend } from "@/types/frontend-index";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const CourseCard = ({ course }: { course: ICourseFrontend }) => {
  console.log("CourseCard rendered for course:", course);
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <Link key={course.id} href={`/courses/${course.id}`}>
        <div>
          <CardImage url={course?.image} title={course?.title} />
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
              {course?.title}
            </div>
            <p className="text-xs text-muted-foreground">
              {course?.category?.title}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <BookOpen className="w-4" />
                </div>
                <span>{course?.modules?.length} Chapters</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <p className="text-md md:text-sm font-medium text-slate-700">
          {formatPrice(course?.price)}
        </p>

        <EnrollCourse asLink={true} course={course} />
      </div>
    </div>
  );
};

export default CourseCard;
