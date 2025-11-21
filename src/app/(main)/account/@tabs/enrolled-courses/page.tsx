import { auth } from "@/auth";
import { getEnrollmentsForStudent } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../_components/enrolled-course-card";

const EnrolledCoursesPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session.user.email!);
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
