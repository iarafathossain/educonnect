import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
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
  { timestamps: true },
);

enrollmentSchema.plugin(mongooseTransform);

export const EnrollmentModel =
  mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);
