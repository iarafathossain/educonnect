import { getCourse } from "@/queries/courses";
import { ICourseFrontend } from "@/types/frontend-index";
import CourseDetails from "./_components/course-details";
import CourseDetailsInfo from "./_components/course-details-info";
import RelatedCourses from "./_components/related-course";
import Testimonials from "./_components/testimonial";

const CourseDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const course: ICourseFrontend | null = await getCourse(id);

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <>
      <CourseDetailsInfo course={course} />

      <CourseDetails course={course} />

      {course?.testimonials && course.testimonials.length > 0 && (
        <Testimonials testimonials={course.testimonials} />
      )}

      <RelatedCourses />
    </>
  );
};

export default CourseDetailsPage;
