import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formate-price";
import {
  getCourseDetailsByInstructor,
  getCourses,
} from "@/services/course-services";
import { getEnrollmentsForCourse } from "@/services/enrollment-services";
import { getTestimonialsForCourse } from "@/services/testimonial-services";
import { getUserByEmail } from "@/services/user-services";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const user = await getUserByEmail(session.user.email!);

  if (!user) {
    redirect("/login");
  }

  if (user?.role !== "instructor" && user?.role !== "admin") {
    redirect("/");
  }

  const courseStats =
    user.role === "admin"
      ? await (async () => {
          const courses = await getCourses();

          const enrollments = await Promise.all(
            courses.map(async (course) => getEnrollmentsForCourse(course.id)),
          );

          const reviews = await Promise.all(
            courses.map(async (course) => getTestimonialsForCourse(course.id)),
          );

          const totalRevenue = courses.reduce((acc, course, index) => {
            return (
              acc + (enrollments[index]?.length ?? 0) * (course.price ?? 0)
            );
          }, 0);

          return {
            courses: courses.length,
            enrollments: enrollments.flat().length,
            reviews: reviews.flat().length,
            ratings: "0",
            revenue: totalRevenue,
          };
        })()
      : await getCourseDetailsByInstructor(user.id);

  const { courses, enrollments, revenue } = courseStats;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses}</div>
          </CardContent>
        </Card>
        {/* total enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments}</div>
          </CardContent>
        </Card>
        {/* total revinue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(revenue)}</div>
          </CardContent>
        </Card>
      </div>
      {/*  */}
    </div>
  );
};

export default DashboardPage;
