import { IEnrollment } from "@/types/backend-index";
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema<IEnrollment>(
  {
    status: {
      type: String,
      enum: ["not-started", "completed", "cancelled"],
      default: "not-started",
    },
    completionDate: { type: Date },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "stripe"],
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export const EnrollmentModel =
  (mongoose.models?.Enrollment as mongoose.Model<IEnrollment>) ||
  mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);
