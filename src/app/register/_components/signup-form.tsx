"use client";

import { userRegistrationAction } from "@/actions/auth-actions";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUserRole, USER_ROLES } from "@/constants/enums";
import {
  TUserRegistration,
  userRegistrationZodSchema,
} from "@/validators/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SignupFormProps {
  role: TUserRole;
}

const SignupForm = ({ role }: SignupFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserRegistration>({
    resolver: zodResolver(userRegistrationZodSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: Object.values(USER_ROLES).includes(role)
        ? role
        : USER_ROLES.student,
    },
  });

  const onSubmit = async (payload: TUserRegistration) => {
    console.log("Form data before submission:", payload);

    const result = await userRegistrationAction(payload);

    console.log("Registration payload:", payload);
    console.log("Registration result:", result);

    if (!result.success) {
      toast.error(result.error);

      if (result.statusCode === 409) {
        router.push("/login");
      }

      return;
    }

    toast.success("Account created successfully! Please log in.");
    router.push("/login");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field error={errors.firstName}>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    name="firstName"
                    type="text"
                  />
                </Field>
                <Field error={errors.lastName}>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    name="lastName"
                    type="text"
                  />
                </Field>
              </div>
              <Field error={errors.email}>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                />
              </Field>
              <Field error={errors.password}>
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  type="password"
                  id="password"
                  name="password"
                />
              </Field>
              <Field error={errors.confirmPassword}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </Field>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create an account"}
              </Button>
            </div>
          </fieldset>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
