import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { getEnrollmentsForStudent } from "@/services/enrollment-services";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../_components/enrolled-course-card";

const EnrolledCoursesPage = async () => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    redirect("/login");
  }

  const enrollments = await getEnrollmentsForStudent(loggedInUser.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        <>
          {enrollments.map((enrollment) => (
            <EnrolledCourseCard key={enrollment?.id} enrollment={enrollment} />
          ))}
        </>
      ) : (
        <p className="text-sm"> No Enrollments found!</p>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
