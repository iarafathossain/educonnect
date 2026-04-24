"use client";

import { updateContactInfoAction } from "@/actions/account-actions";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TSessionUser } from "@/types/user";
import {
  contactInfoFormZodSchema,
  TContactInfoForm,
  TContactInfoUpdate,
} from "@/validators/account-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactItem = {
  type: string;
  value: string;
  hasContact: boolean;
};

interface ContactInfoProps {
  userInfo: TSessionUser;
}

const ContactInfo = ({ userInfo }: ContactInfoProps) => {
  const [contactList, setContactList] = useState<ContactItem[]>([
    {
      type: "Phone",
      value: userInfo?.phone || "",
      hasContact: !!userInfo?.phone,
    },
    {
      type: "Website",
      value: userInfo?.website || "",
      hasContact: !!userInfo?.website,
    },
    {
      type: "Facebook",
      value: userInfo?.socialLinks?.facebook || "",
      hasContact: !!userInfo?.socialLinks?.facebook,
    },
    {
      type: "Twitter",
      value: userInfo?.socialLinks?.twitter || "",
      hasContact: !!userInfo?.socialLinks?.twitter,
    },
    {
      type: "LinkedIn",
      value: userInfo?.socialLinks?.linkedin || "",
      hasContact: !!userInfo?.socialLinks?.linkedin,
    },
  ]);

  const [showContactItems, setShowContactItems] = useState<boolean>(false);
  const plusRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TContactInfoForm>({
    resolver: zodResolver(contactInfoFormZodSchema),
    defaultValues: {
      phone: userInfo?.phone || "",
      website: userInfo?.website || "",
      facebook: userInfo?.socialLinks?.facebook || "",
      twitter: userInfo?.socialLinks?.twitter || "",
      linkedin: userInfo?.socialLinks?.linkedin || "",
    },
  });

  const onSubmit = async (data: TContactInfoForm) => {
    const contactDataToUpdate: TContactInfoUpdate = {};

    if (data.phone !== (userInfo.phone || "")) {
      contactDataToUpdate.phone = data.phone;
    }

    if (data.website !== (userInfo.website || "")) {
      contactDataToUpdate.website = data.website;
    }

    if (data.facebook !== (userInfo.socialLinks?.facebook || "")) {
      contactDataToUpdate.facebook = data.facebook;
    }

    if (data.twitter !== (userInfo.socialLinks?.twitter || "")) {
      contactDataToUpdate.twitter = data.twitter;
    }

    if (data.linkedin !== (userInfo.socialLinks?.linkedin || "")) {
      contactDataToUpdate.linkedin = data.linkedin;
    }

    if (Object.keys(contactDataToUpdate).length === 0) {
      toast.info("No changes detected");
      return;
    }

    const result = await updateContactInfoAction(
      userInfo.email,
      contactDataToUpdate,
    );

    if (!result.success) {
      toast.error(result.error || "Failed to update contact information");
      return;
    }

    toast.success("Contact information updated successfully");
  };

  const PhoneField = (
    <Field error={errors.phone}>
      <Label className="mb-2 block">Phone No. :</Label>
      <Input
        id="phone"
        type="text"
        placeholder="Enter phone number"
        {...register("phone")}
      />
    </Field>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (plusRef.current && !plusRef.current.contains(event.target as Node)) {
        setShowContactItems(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            {contactList.map((contact) => {
              if (contact.type === "Phone")
                return <div key={contact.type}>{PhoneField}</div>;
              if (contact.hasContact && contact.type !== "Phone") {
                return (
                  <Field
                    key={contact.type}
                    error={errors[contact.type as keyof typeof errors]}
                  >
                    <Label className="mb-2 block">{contact.type} :</Label>
                    <Input
                      {...register(
                        contact.type.toLowerCase() as
                          | "phone"
                          | "website"
                          | "facebook"
                          | "twitter"
                          | "linkedin",
                      )}
                      id={contact.type.toLowerCase()}
                      type={
                        contact.type === "Website" ||
                        contact.type === "Facebook" ||
                        contact.type === "LinkedIn"
                          ? "url"
                          : "text"
                      }
                      placeholder={`Enter your ${contact.type.toLowerCase()}`}
                    />
                  </Field>
                );
              }
              return null;
            })}
          </div>
          <div className="flex justify-between items-center relative">
            <Button className="mt-5" type="submit">
              <input
                type="submit"
                value={isSubmitting ? "Saving" : "Save Changes"}
              />
            </Button>
            <div ref={plusRef}>
              <Plus
                onClick={() => setShowContactItems((prev) => !prev)}
                className="cursor-pointer text-gray-500 hover:text-gray-700 rounded-full border hover:scale-y-105 duration-200"
              />
              {showContactItems && (
                <div className="absolute top-12 right-4 bg-white dark:bg-slate-800 shadow-lg rounded-md z-10">
                  {contactList.map((contact) => {
                    if (!contact.hasContact) {
                      return (
                        <ul key={contact.type} className="flex flex-col gap-2">
                          <li
                            onClick={() =>
                              setContactList((prev) =>
                                prev.map((c) =>
                                  c.type === contact.type
                                    ? { ...c, hasContact: true }
                                    : c,
                                ),
                              )
                            }
                            className="flex items-center justify-between py-1 px-4 gap-5 hover:bg-gray-100 hover:cursor-pointer border-b"
                          >
                            <span>{contact.type}</span>
                            <Link size={15} />
                          </li>
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default ContactInfo;
