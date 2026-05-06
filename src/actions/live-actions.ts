"use server";

import { actionWrapper } from "@/lib/action-wrapper";
import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { liveServices } from "@/services/live-services";
import { CreateLivePayload } from "@/validators/live-validator";
import status from "http-status";

export const createLiveAction = actionWrapper(
  async (payload: CreateLivePayload) => {
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
      return {
        success: false,
        error: "Please log in to create a live session",
        statusCode: status.UNAUTHORIZED,
      };
    }

    const createdLive = await liveServices.create(payload, loggedInUser.id);

    return {
      success: true,
      message: "Live session created successfully",
      statusCode: status.CREATED,
      data: createdLive,
    };
  },
);

export const updateLiveAction = actionWrapper(
  async (liveId: string, payload: Record<string, unknown>) => {
    await liveServices.update(liveId, payload);

    return {
      success: true,
      message: "Live session updated successfully",
      statusCode: status.OK,
    };
  },
);

export const changeLivePublishState = actionWrapper(async (liveId: string) => {
  const activeState = await liveServices.changePublishState(liveId);

  return {
    success: true,
    message: "Live session publish state changed successfully",
    statusCode: status.OK,
    data: activeState,
  };
});

export const deleteLive = actionWrapper(async (liveId: string) => {
  await liveServices.delete(liveId);

  return {
    success: true,
    message: "Live session deleted successfully",
    statusCode: status.OK,
  };
});
