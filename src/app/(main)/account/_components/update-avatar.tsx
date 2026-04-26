"use client";

import { updatePersonalDetailsAction } from "@/actions/account-actions";
import { Pencil } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface UpdateAvatarProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    image?: string | null;
  } | null;
}

interface CloudinaryUploadResult {
  info: {
    secure_url: string;
    public_id: string;
  };
}

const UpdateAvatar = ({ user }: UpdateAvatarProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(user?.image || null);
  const [isSubmitting, startTransition] = useTransition();

  return (
    <div className="mx-auto flex flex-col items-center gap-3">
      <CldUploadWidget
        uploadPreset="educonnect-media"
        onSuccess={(result, { widget }) => {
          const res = result as unknown as CloudinaryUploadResult;
          const nextImageUrl = res.info.secure_url;

          if (!user?.email) {
            toast.error("User information is not available");
            widget.close();
            return;
          }

          if (!nextImageUrl) {
            toast.error("Image upload succeeded but URL was not found");
            widget.close();
            return;
          }

          if (nextImageUrl === (user?.image || "")) {
            toast.info("This image is already set as your profile photo");
            widget.close();
            return;
          }

          setImageUrl(nextImageUrl);
          const toastId = toast.loading(
            "Uploading complete. Updating profile photo...",
          );

          startTransition(async () => {
            const saveResult = await updatePersonalDetailsAction(user.email, {
              image: nextImageUrl,
            });

            if (!saveResult.success) {
              toast.error(
                saveResult.error || "Failed to update profile photo",
                {
                  id: toastId,
                },
              );
              return;
            }

            toast.success("Profile photo updated successfully", {
              id: toastId,
            });
          });

          widget.close();
        }}
        onError={() => {
          toast.error("Image upload failed. Please try again.");
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="relative size-28 cursor-pointer"
            onClick={() => open()}
            disabled={isSubmitting}
            aria-label="Update profile photo"
          >
            <Image
              src={imageUrl || user?.image || "/default-profile.png"}
              className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
              id="profile-banner"
              alt={`${user?.firstName} ${user?.lastName}`}
              width={112}
              height={112}
            />
            <span className="absolute right-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-700 shadow ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
              <Pencil className="h-4 w-4" />
            </span>
            {/* pulse effect */}
            {isSubmitting && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-ping" />
            )}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UpdateAvatar;
