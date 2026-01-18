"use server";

import { LessonModel } from "@/models/lesson-model";
import { ModuleModel } from "@/models/module-model";
import { create } from "@/queries/lessons";
import { connectDB } from "@/services/connect-mongo";

export const createLesson = async (data) => {
  try {
    // Ensure this action always runs on the server and DB is ready before any model calls
    await connectDB();
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = Number(data.get("order"));

    const createdLesson = await create({ title, slug, order });

    const moduleDetails = await ModuleModel.findById(moduleId);
    moduleDetails.lessonIds.push(createdLesson._id);
    await moduleDetails.save();

    return createdLesson;
  } catch (err) {
    throw new Error(err);
  }
};

export const reorderLessons = async (data) => {
  console.log("Reordering lessons with data:", data);
  await connectDB();
  try {
    await Promise.all(
      data.map(async (element) => {
        await LessonModel.findByIdAndUpdate(element._id, {
          order: element.position,
        });
      }),
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const updateLesson = async (lessonId, data) => {
  await connectDB();
  try {
    await LessonModel.findByIdAndUpdate(lessonId, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const changeLessonPublishState = async (lessonId) => {
  await connectDB();
  try {
    const lesson = await LessonModel.findById(lessonId);
    lesson.active = !lesson.active;
    await lesson.save();
    return lesson.active;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteLesson = async (lessonId, moduleId) => {
  await connectDB();
  console.log({ lessonId, moduleId });
  try {
    const existingModule = await ModuleModel.findById(moduleId);
    if (!existingModule) {
      throw new Error("Module not found");
    }
    // Remove lessonId from module's lessonIds array by filtering it out
    existingModule.lessonIds = existingModule.lessonIds.filter(
      (id) => id.toString() !== lessonId,
    );
    // remove the lesson document by pulling it from the database
    // existingModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await LessonModel.findByIdAndDelete(lessonId);
    await existingModule.save();
  } catch (error) {
    throw new Error(error);
  }
};
