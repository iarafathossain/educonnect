"use client";

import { updatePersonalDetailsAction } from "@/actions/account-actions";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TSessionUser } from "@/types/user";
import {
  personalDetailsFormZodSchema,
  TPersonalDetailsForm,
  TPersonalDetailsUpdate,
} from "@/validators/account-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PersonalDetailsProps {
  userInfo: TSessionUser;
}

const PersonalDetails = ({ userInfo }: PersonalDetailsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPersonalDetailsForm>({
    resolver: zodResolver(personalDetailsFormZodSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      designation: userInfo.designation || "",
      bio: userInfo.bio || "",
    },
  });

  const onSubmit = async (data: TPersonalDetailsForm) => {
    const userDataToUpdate: TPersonalDetailsUpdate = {};

    if (data.firstName !== userInfo.firstName) {
      userDataToUpdate.firstName = data.firstName;
    }

    if (data.lastName !== userInfo.lastName) {
      userDataToUpdate.lastName = data.lastName;
    }

    if (data.designation !== (userInfo.designation || "")) {
      userDataToUpdate.designation = data.designation;
    }

    if (data.bio !== (userInfo.bio || "")) {
      userDataToUpdate.bio = data.bio;
    }

    if (Object.keys(userDataToUpdate).length === 0) {
      toast.info("No changes detected");
      return;
    }

    const result = await updatePersonalDetailsAction(
      userInfo.email,
      userDataToUpdate,
    );

    if (!result.success) {
      toast.error(result.error || "Failed to update personal details");
      return;
    }

    toast.success("Personal details updated successfully");
  };
  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
      <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <Field error={errors.firstName}>
              <Label className="mb-2 block">
                First Name : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                placeholder="First Name:"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </Field>
            <Field error={errors.lastName}>
              <Label className="mb-2 block">
                Last Name : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Last Name:"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
            </Field>
            <Field error={errors.email}>
              <Label className="mb-2 block">
                Your Email : <span className="text-red-600">*</span>
              </Label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                disabled
              />
            </Field>
            <Field error={errors.designation}>
              <Label className="mb-2 block">Occupation :</Label>
              <Input
                id="designation"
                type="text"
                placeholder="Occupation :"
                {...register("designation")}
              />
            </Field>
          </div>
          {/*end grid*/}
          <div className="grid grid-cols-1">
            <div className="mt-5">
              <Field error={errors.bio}>
                <Label className="mb-2 block">Bio :</Label>
                <Textarea
                  id="bui"
                  {...register("bio", {
                    maxLength: {
                      value: 300,
                      message: "Bio cannot exceed 300 characters",
                    },
                  })}
                  placeholder="Enter your Bio"
                />
              </Field>
            </div>
          </div>
          {/*end row*/}
          <Button className="mt-5 cursor-pointer" asChild>
            <input
              type="submit"
              name="send"
              value={isSubmitting ? "Saving..." : "Save Changes"}
            />
          </Button>
        </form>
      </fieldset>
      {/*end form*/}
    </div>
  );
};

export default PersonalDetails;
