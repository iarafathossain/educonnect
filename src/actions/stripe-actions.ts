"use server";

import { formatStripeAmount } from "@/lib/formate-stripe-amount";
import { stripe } from "@/lib/stripe";
import { getCourse } from "@/services/course-services";
import { headers } from "next/headers";

const CURRENCY = "usd";

export const createCheckoutSessionAction = async (formData: FormData) => {
  const courseId = formData.get("courseId") as string;
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const course = await getCourse(courseId);

  if (!course) return new Error("Course not found!");

  const courseName = course?.title;
  const coursePrice = course?.price;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkoutSession: any = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: courseName,
          },
          unit_amount: formatStripeAmount(Number(coursePrice), CURRENCY),
        },
      },
    ],
    ...(ui_mode === "hosted" && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
      cancel_url: `${origin}/courses`,
    }),
    ui_mode,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
};

export const createPaymentIntentAction = async (data) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatStripeAmount(1000, CURRENCY),
    currency: CURRENCY,
    automatic_payment_methods: { enabled: true },
  });

  return {
    client_secret: paymentIntent.client_secret,
  };
};
