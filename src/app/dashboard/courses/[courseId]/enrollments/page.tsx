import {
  ENROLLMENT_DATA,
  getInstructorDashboardData,
} from "@/lib/dashboard-helper";
import { getCourse } from "@/services/course-services";
import type { IEnrollmentFrontend } from "@/validators/frontend-types";
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
  const allEnrollments = (await getInstructorDashboardData(ENROLLMENT_DATA)) as
    | IEnrollmentFrontend[]
    | undefined;

  const enrollmentForCourse = (allEnrollments ?? []).filter(
    (enrollment: IEnrollmentFrontend) => enrollment?.course?.id === courseId,
  );

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollmentForCourse} />
    </div>
  );
};

export default EnrollmentsPage;
