import {
  ENROLLMENT_DATA,
  getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { getCourse } from "@/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

interface EnrollmentsPageProps {
  params: {
    courseId: string;
  };
}

const EnrollmentsPage = async ({
  params: { courseId },
}: EnrollmentsPageProps) => {
  const course = await getCourse(courseId);
  const allEnrollments = await getInstructorDashboardData(ENROLLMENT_DATA);

  const enrollmentForCourse =
    allEnrollments &&
    allEnrollments.filter((enrollment) => enrollment?.course === courseId);

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentForCourse} />
    </div>
  );
};

export default EnrollmentsPage;
