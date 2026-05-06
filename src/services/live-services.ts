import { AppError } from "@/lib/app-error";
import { connectDB } from "@/lib/connect-mongo";
import { LiveModel } from "@/models/live-model";
import "@/models/user-model";
import { CreateLivePayload } from "@/validators/live-validator";
import status from "http-status";

export const liveServices = {
  getLives: async () => {
    await connectDB();

    const lives = await LiveModel.find().populate({
      path: "instructor",
      model: "User",
    });

    return lives.map((live) => live.toJSON());
  },

  getLive: async (id: string) => {
    await connectDB();

    const live = await LiveModel.findById(id).populate({
      path: "instructor",
      model: "User",
    });

    return live ? live.toJSON() : null;
  },

  getLivesByInstructor: async (instructorId: string) => {
    await connectDB();
    const lives = await LiveModel.find({ instructor: instructorId }).populate({
      path: "instructor",
      model: "User",
    });

    return lives.map((live) => live.toJSON());
  },

  create: async (payload: CreateLivePayload, instructorId: string) => {
    await connectDB();
    const liveData = {
      ...payload,
      instructor: instructorId,
    };

    const newLive = await LiveModel.create(liveData);
    return newLive.toJSON();
  },

  update: async (liveId: string, payload: Record<string, unknown>) => {
    await connectDB();
    const updatedLive = await LiveModel.findByIdAndUpdate(liveId, payload, {
      new: true,
    });

    if (!updatedLive) {
      throw new AppError("Live not found", status.NOT_FOUND);
    }

    return updatedLive.toJSON();
  },

  changePublishState: async (liveId: string) => {
    await connectDB();
    const live = await LiveModel.findById(liveId);

    if (!live) {
      throw new AppError("Live not found", status.NOT_FOUND);
    }

    live.active = !live.active;
    await live.save();

    return live.active;
  },

  delete: async (liveId: string) => {
    await connectDB();
    const deletedLive = await LiveModel.findByIdAndDelete(liveId);

    if (!deletedLive) {
      throw new AppError("Live not found", status.NOT_FOUND);
    }
  },
};

export const getLives = liveServices.getLives;
export const getLive = liveServices.getLive;
export const getLivesByInstructor = liveServices.getLivesByInstructor;
export const createLive = liveServices.create;
