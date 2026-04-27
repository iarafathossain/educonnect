"use client";

import { updateCourseAction } from "@/actions/course-actions";
import { cn } from "@/lib/utils";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

interface ImageFormProps {
  initialData: {
    imageUrl?: string;
  };
  courseId: string;
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string;
    public_id: string;
  };
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  const [isSubmitting, startTransition] = useTransition();

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <CldUploadWidget
        uploadPreset="educonnect-media"
        onSuccess={(result, { widget }) => {
          const res = result as unknown as CloudinaryUploadResult;
          const nextImageUrl = res.info.secure_url;

          if (!nextImageUrl) {
            toast.error("Image upload succeeded but URL was not found");
            widget.close();
            return;
          }

          if (nextImageUrl === (imageUrl || "")) {
            toast.info("This image is already set for the course");
            widget.close();
            return;
          }

          setImageUrl(nextImageUrl);
          const toastId = toast.loading(
            "Uploading complete. Updating course image...",
          );

          startTransition(async () => {
            const result = await updateCourseAction(courseId, {
              image: nextImageUrl,
            });

            if (!result.success) {
              toast.error(result.error || "Failed to update course image", {
                id: toastId,
              });
              return;
            }

            toast.success("Course image updated successfully", {
              id: toastId,
            });
            router.refresh();
          });

          widget.close();
        }}
        onError={() => {
          toast.error("Image upload failed. Please try again.");
        }}
      >
        {({ open }) => (
          <div>
            <div className="font-medium flex items-center justify-between">
              <span>Course Image</span>
              <button
                type="button"
                className="inline-flex items-center text-sm text-sky-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => open()}
                disabled={isSubmitting}
              >
                {!imageUrl ? (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add an image
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit image
                  </>
                )}
              </button>
            </div>
            <button
              type="button"
              className={cn(
                "group relative mt-2 flex h-60 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-white transition hover:bg-muted/30",
                isSubmitting && "pointer-events-none opacity-80",
              )}
              onClick={() => open()}
              disabled={isSubmitting}
              aria-label="Upload course image"
            >
              {!imageUrl ? (
                <div className="flex flex-col items-center gap-2 text-slate-500">
                  <ImageIcon className="h-10 w-10" />
                  <span className="text-sm font-medium">Click to upload</span>
                </div>
              ) : (
                <Image
                  alt="Course image"
                  fill
                  className="object-cover"
                  src={imageUrl}
                />
              )}
              {isSubmitting && (
                <span className="absolute inset-0 rounded-md bg-black/10 animate-pulse" />
              )}
            </button>
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};
