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
      })
    );
  } catch (err) {
    throw new Error(err);
  }
};
