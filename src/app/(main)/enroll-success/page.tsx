import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/lib/send-email";
import { stripe } from "@/lib/stripe";
import { getCourse } from "@/services/course-services";
import { createEnrollment, hasEnrollmentForCourse } from "@/services/enrollment-services";
import { getUserByEmail } from "@/services/user-services";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const EnrollSuccessPage = async ({
  searchParams: { session_id, course_id },
}: {
  searchParams: { session_id: string; course_id: string };
}) => {
  const course = await getCourse(course_id);
  if (!session_id || !course) {
    return (
      <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl">Enrollment Failed</h1>
      </div>
    );
  }

  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(userSession.user.email);
  if (!loggedInUser) {
    redirect("/login");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession.payment_intent;
  const paymentStatus =
    typeof paymentIntent === "object" && paymentIntent
      ? paymentIntent.status
      : null;

  // customer info
  const customerName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  const customerEmail = loggedInUser.email;
  const paymentEmail = checkoutSession.customer_email;

  const productName = course.title;

  if (paymentStatus === "succeeded") {
    // Check if enrollment already exists to prevent duplicates on page refresh
    const existingEnrollment = await hasEnrollmentForCourse(
      course_id,
      loggedInUser.id,
    );

    if (!existingEnrollment) {
      await createEnrollment(course_id, loggedInUser.id, "stripe");
    }

    const instructorName = `${course.instructor.firstName} ${course.instructor.lastName}`;
    const instructorEmail = course.instructor.email;

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment: ${productName}`,
        message: `Congratulations ${instructorName},\n\nYou have a new enrollment for your course "${productName}".\n\nStudent Name: ${customerName}\nStudent Email: ${customerEmail}\n\nBest regards,\nEduConnect Team`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Successful: ${productName}`,
        message: `Dear ${customerName},\n\nThank you for enrolling in the course "${productName}". We are excited to have you on board!\n\nBest regards,\nEduConnect Team`,
      },
      paymentEmail &&
        paymentEmail !== customerEmail && {
          to: paymentEmail,
          subject: `Payment Receipt: ${productName}`,
          message: `Dear ${customerName},\n\nThank you for your payment for the course "${productName}". We appreciate your support!\n\nBest regards,\nEduConnect Team`,
        },
    ];

    const filteredEmails = emailsToSend.filter(Boolean) as {
      to: string;
      subject: string;
      message: string;
    }[];
    await sendEmail(filteredEmails);
  }
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations, <strong>{customerName}</strong> Your enrollment was
          successful for this <strong>{productName}</strong> course.
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollSuccessPage;
