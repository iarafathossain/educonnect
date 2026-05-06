import { auth } from "@/auth";
import { TUserRole } from "@/constants/enums";
import { getUserByEmail } from "@/services/user-services";
import { redirect } from "next/navigation";

export const requireDashboardRole = async (allowedRoles: TUserRole[]) => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);
  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/dashboard");
  }

  return user;
};
