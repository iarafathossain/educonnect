"use server";

import { signIn } from "@/auth";

export const credentialLoginAction = async (formData: {
  email: string;
  password: string;
}) => {
  const response = await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirect: false,
  });

  return response;
};

export const socialLoginAction = async (formData: FormData) => {
  const action = formData.get("action") as string;
  await signIn(action, { redirectTo: "/courses" });
};
