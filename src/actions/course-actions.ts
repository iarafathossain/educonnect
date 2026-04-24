"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { courseServices } from "@/services/course-services";
import { CreateCoursePayload } from "@/validators/course-validator";
import status from "http-status";

export const createCourseAction = actionWrapper(
	async (payload: CreateCoursePayload) => {
		const loggedInUser = await getLoggedInUser();

		if (!loggedInUser) {
			return {
				success: false,
				error: "Please logged in to create a course",
				statusCode: status.UNAUTHORIZED,
			};
		}

		const createdCourse = await courseServices.create(payload, loggedInUser.id);

		return {
			success: true,
			message: "Course created successfully",
			statusCode: status.CREATED,
			data: createdCourse,
		};
	},
);

export const updateCourseAction = actionWrapper(
	async (courseId: string, payload: Record<string, unknown>) => {
		await courseServices.update(courseId, payload);

		return {
			success: true,
			message: "Course updated successfully",
			statusCode: status.OK,
		};
	},
);

export const changeCoursePublishState = actionWrapper(async (courseId: string) => {
	const activeState = await courseServices.changePublishState(courseId);

	return {
		success: true,
		message: "Course publish state changed successfully",
		statusCode: status.OK,
		data: activeState,
	};
});

export const deleteCourse = actionWrapper(async (courseId: string) => {
	await courseServices.delete(courseId);

	return {
		success: true,
		message: "Course deleted successfully",
		statusCode: status.OK,
	};
});
