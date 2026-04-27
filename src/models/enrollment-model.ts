import {
  ENROLLMENT_STATUSES,
  PAYMENT_METHODS,
  TEnrollmentStatus,
  TPaymentMethod,
} from "@/constants/enums";
import { mongooseTransform } from "@/lib/mongoose-transform.plugin";
import mongoose from "mongoose";

export interface IEnrollmentModel extends mongoose.Document {
  status: TEnrollmentStatus;
  completionDate?: Date;
  paymentMethod: TPaymentMethod;
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const enrollmentSchema = new mongoose.Schema<IEnrollmentModel>(
  {
    status: {
      type: String,
      enum: ENROLLMENT_STATUSES,
      default: "not-started",
    },
    completionDate: { type: Date },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
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
  mongoose.models?.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
