import { IEnrollment } from "@/types/backend-index";
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema<IEnrollment>({
  enrollmentDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
  completionDate: { type: Date },
  method: {
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
});

export const EnrollmentModel =
  (mongoose.models.Enrollment as mongoose.Model<IEnrollment>) ||
  mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);
