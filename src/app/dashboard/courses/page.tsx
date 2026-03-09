import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import DataTable from "./_components/data-table";

const CoursesPage = async () => {
  const courses = await getInstructorDashboardData("course");

  //TODO: fix when there are no courses, show a message instead of an empty table
  //TODO: fix null error when courses []

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
