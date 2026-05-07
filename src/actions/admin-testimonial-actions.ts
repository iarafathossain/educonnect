"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { connectDB } from "@/lib/connect-mongo";
import { TestimonialModel } from "@/models/testimonial-model";
import status from "http-status";

export const updateTestimonial = actionWrapper(async (testimonialId: string, payload: Record<string, unknown>) => {
  await connectDB();
  const updated = await TestimonialModel.findByIdAndUpdate(testimonialId, payload, { new: true });
  if (!updated) {
    return { success: false, error: "Testimonial not found", statusCode: status.NOT_FOUND };
  }
  return { success: true, message: "Testimonial updated", statusCode: status.OK };
});

export const deleteTestimonial = actionWrapper(async (testimonialId: string) => {
  await connectDB();
  const deleted = await TestimonialModel.findByIdAndDelete(testimonialId);
  if (!deleted) {
    return { success: false, error: "Testimonial not found", statusCode: status.NOT_FOUND };
  }
  return { success: true, message: "Testimonial deleted", statusCode: status.OK };
});
