"use client";

import { createCheckoutSessionAction } from "@/actions/stripe-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ICourseFrontend } from "@/validators/frontend-types";
import { ArrowRight } from "lucide-react";

interface EnrollCourseProps {
  asLink?: boolean;
  course: ICourseFrontend;
}

const EnrollCourse = ({ asLink, course }: EnrollCourseProps) => {
  const formAction = async (formData: FormData) => {
    const result = await createCheckoutSessionAction(formData);
    if (result instanceof Error) {
      console.error("Failed to create checkout session:", result);
      return;
    }
    const url = result.url;
    if (url) {
      window.location.assign(url);
    }
  };

  //TODO: prevent enrollment from instructor role

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={course.id} />
        {asLink ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
