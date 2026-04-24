import { updateCourseAction } from "@/actions/course-actions";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pump = promisify(pipeline);

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const destination = formData.get("destination");
    if (!destination || typeof destination !== "string") {
      return new Response("Invalid destination", { status: 400 });
    }

    const courseId = formData.get("courseId");
    if (!courseId || typeof courseId !== "string") {
      return new Response("Invalid courseId", { status: 400 });
    }

    const filePath = `${destination}/${Date.now()}-${file.name}`;

    await pump(file.stream(), fs.createWriteStream(filePath));
    const updateResult = await updateCourseAction(courseId, {
      thumbnail: filePath,
    });

    if (!updateResult.success) {
      return new Response(updateResult.error, { status: updateResult.statusCode });
    }

    return new Response(
      JSON.stringify({
        message: `File ${file.name} uploaded successfully`,
        path: filePath,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
