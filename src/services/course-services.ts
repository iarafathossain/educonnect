import { AppError } from "@/lib/app-error";
import { CourseModel } from "@/models/course-model";
import { CreateCoursePayload } from "@/validators/course-validator";
import status from "http-status";

export const courseServices = {
	create: async (payload: CreateCoursePayload, instructorId: string) => {
		const courseData = {
			...payload,
			instructor: instructorId,
		};

		const newCourse = await CourseModel.create(courseData);
		return newCourse.toJSON();
	},

	update: async (courseId: string, payload: Record<string, unknown>) => {
		const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, payload, {
			new: true,
		});

		if (!updatedCourse) {
			throw new AppError("Course not found", status.NOT_FOUND);
		}

		return updatedCourse.toJSON();
	},

	changePublishState: async (courseId: string) => {
		const course = await CourseModel.findById(courseId);

		if (!course) {
			throw new AppError("Course not found", status.NOT_FOUND);
		}

		course.active = !course.active;
		await course.save();

		return course.active;
	},

	delete: async (courseId: string) => {
		const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

		if (!deletedCourse) {
			throw new AppError("Course not found", status.NOT_FOUND);
		}
	},
};
