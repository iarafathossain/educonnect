"use client";

import { changePasswordAction } from "@/app/actions/account";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchError } from "@/lib/catch-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangePassword = ({ email }: { email: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const { oldPassword, newPassword } = watch();
    try {
      await changePasswordAction(email, oldPassword, newPassword);
      toast.success("Password changed successfully");
    } catch (error) {
      const errMsg = catchError(error);
      toast.error(errMsg);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5">
            <Field error={errors.oldPassword}>
              <Label className="mb-2 block">Old password :</Label>
              <Input
                type="password"
                placeholder="Old password"
                id="oldPassword"
                {...register("oldPassword", {
                  required: "Old password is required",
                  minLength: {
                    value: 6,
                    message: "Old password must be at least 6 characters long",
                  },
                })}
              />
            </Field>
            <Field error={errors.newPassword}>
              <Label className="mb-2 block">New password :</Label>
              <Input
                type="password"
                placeholder="New password"
                id="newPassword"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "New password must be at least 6 characters long",
                  },
                })}
              />
            </Field>
            <Field error={errors.retypeNewPassword}>
              <Label className="mb-2 block">Re-type New password :</Label>
              <Input
                type="password"
                placeholder="Re-type New password"
                id="retypeNewPassword"
                {...register("retypeNewPassword", {
                  required: "Please re-type the new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
            </Field>
          </div>
          {/*end grid*/}
          <Button className="mt-5 cursor-pointer" type="submit">
            Save password
          </Button>
        </form>
      </fieldset>
    </div>
  );
};

export default ChangePassword;
