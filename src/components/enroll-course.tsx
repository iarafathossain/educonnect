"use client";

import { createCheckoutSessionAction } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ICourseFrontend } from "@/types/frontend-index";
import { ArrowRight } from "lucide-react";

const EnrollCourse = ({
  asLink,
  course,
}: {
  asLink?: boolean;
  course: ICourseFrontend;
}) => {
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
