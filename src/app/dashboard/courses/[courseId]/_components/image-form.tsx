"use client";

import { useEffect, useState } from "react";

// import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { updateCourseAction } from "@/actions/course-actions";
import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { catchError } from "@/lib/catch-error";
import { UpdateCourseImagePayload } from "@/validators/course-validator";
import { useRouter } from "next/navigation";

interface ImageFormProps {
  initialData: {
    imageUrl?: string;
  };
  courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: UpdateCourseImagePayload) => {
    const result = await updateCourseAction(courseId, values);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Course updated");
    toggleEdit();
    router.refresh();
  };

  useEffect(() => {
    if (!file) return;

    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("destination", "./public/assets/images/courses");
        formData.append("courseId", courseId);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const data = await response.json();

        setImageUrl(data.path.replace("./public", ""));
        setFile(null);
        toast.success("Image uploaded successfully");
        toggleEdit();
        router.refresh();
      } catch (error: unknown) {
        toast.error(catchError(error));
      }
    };

    uploadImage();
  }, [file]);

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadDropzone onUpload={(file: File[]) => setFile(file)} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
