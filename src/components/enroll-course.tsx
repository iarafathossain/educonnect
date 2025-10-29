"use client";

import { createCheckoutSessionAction } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const EnrollCourse = ({ asLink }: { asLink?: boolean }) => {
  const formAction = async (formData: FormData) => {
    const { url } = await createCheckoutSessionAction(formData);
    if (url) {
      window.location.assign(url);
    }
  };
  return (
    <>
      <form action={formAction}>
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
