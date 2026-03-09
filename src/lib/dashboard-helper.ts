import { auth } from "@/auth";
import { getCourse, getCourseDetailsByInstructor } from "@/queries/courses";
import { getReportsForStudent } from "@/queries/reports";
import { getUserByEmail, getUserDetails } from "@/queries/users";
import { IEnrollmentFrontend } from "@/types/frontend-index";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewData = async (reviews) => {
  const populatedReviews = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user);
      review["studentName"] = `${student?.firstName} ${student?.lastName}`;
      return review;
    }),
  );

  return populatedReviews;
};

const populateEnrollmentData = async (enrollments: IEnrollmentFrontend[]) => {
  const populatedEnrollments = await Promise.all(
    enrollments.map(async (enrollment) => {
      // Update Student Information
      enrollment["studentName"] =
        `${enrollment.student?.firstName} ${enrollment.student?.lastName}`;
      enrollment["studentEmail"] = enrollment.student?.email;

      // Update Quiz and Progress Info
      const filter = {
        course: enrollment?.course?.id,
        student: enrollment?.student?.id,
      };
      const report = await getReportsForStudent(filter);

      enrollment["progress"] = 0;
      enrollment["quizMark"] = 0;
      if (report) {
        // Calculate progress
        const course = await getCourse(enrollment?.course?.id);
        const totalModules = course?.modules?.length || 0;
        const totalCompletedModules =
          report?.totalCompletedModules?.length || 0;
        const progress =
          totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;
        enrollment["progress"] = progress;

        // Calculate Quiz Marks
        const quizzes = report?.quizAssessment?.assessments;
        const quizzesTaken = quizzes.filter((q) => q.attempted);
        const totalCorrect = quizzesTaken
          .map((quiz) => {
            const item = quiz.options;
            return item.filter((o) => {
              return o.isCorrect === true && o.isSelected === true;
            });
          })
          .filter((elem) => elem.length > 0)
          .flat();
        const marksFromQuizees = totalCorrect.length * 5;
        enrollment["quizMark"] = marksFromQuizees;
      }
      return enrollment;
    }),
  );

  return populatedEnrollments;
};

export async function getInstructorDashboardData(dataType: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const instructor = await getUserByEmail(session.user.email);

    if (instructor?.role !== "instructor") {
      throw new Error("Forbidden");
    }

    const data = await getCourseDetailsByInstructor(instructor.id, true);

    console.log("Dashboard Data:", data);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case REVIEW_DATA:
        return populateReviewData(data?.reviews);
      case ENROLLMENT_DATA:
        return populateEnrollmentData(
          data?.enrollments as IEnrollmentFrontend[],
        );

      default:
        return data;
    }
  } catch (error) {
    console.error("Error in getInstructorDashboardData:", error);
  }
}
