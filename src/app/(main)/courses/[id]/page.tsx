import { transformMongoDoc } from "@/lib/transform-mongo-doc";
import { getCourse } from "@/queries/courses";
import CourseDetails from "./_components/course-details";
import CourseDetailsInfo from "./_components/course-details-info";
import RelatedCourses from "./_components/related-course";
import Testimonials from "./_components/testimonial";

const CourseDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const course = await getCourse(id);
  return (
    <>
      <CourseDetailsInfo course={course} />

      <CourseDetails course={course} />

      {course?.testimonials && (
        <Testimonials testimonials={transformMongoDoc(course?.testimonials)} />
      )}

      <RelatedCourses />
    </>
  );
};

export default CourseDetailsPage;
