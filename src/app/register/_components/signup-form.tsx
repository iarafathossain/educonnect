"use client";

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
import { catchError } from "@/lib/catch-error";
import { IUserRegisterForm } from "@/types/frontend-index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupForm = ({ role }: { role: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IUserRegisterForm & { confirmPassword?: string }>();

  const onSubmit = async (
    formData: IUserRegisterForm & { confirmPassword?: string }
  ) => {
    const userRole =
      role === "instructor" || role === "student" ? role : "student";

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRole }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!response.ok || response.status !== 201) {
        throw new Error("Failed to register user");
      }
      router.push("/login");
    } catch (e) {
      const error = catchError(e);
      toast.error(error || "Something went wrong");
      return;
    }
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
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message:
                          "First name must be at least 2 characters long",
                      },
                    })}
                    id="firstName"
                    name="firstName"
                    type="text"
                  />
                </Field>
                <Field error={errors.lastName}>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters long",
                      },
                    })}
                    id="lastName"
                    name="lastName"
                    type="text"
                  />
                </Field>
              </div>
              <Field error={errors.email}>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  id="email"
                  name="email"
                />
              </Field>
              <Field error={errors.password}>
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                />
              </Field>
              <Field error={errors.confirmPassword}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
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
