import { auth } from "@/auth";
import { getUserByEmail } from "@/services/user-services";

export const getLoggedInUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("Please logged in to access");
    }

    return getUserByEmail(session.user.email);
  } catch (error) {
    console.log(error);
  }
};
