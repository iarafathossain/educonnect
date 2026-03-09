import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

export const getLoggedInUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("Please logged in to access");
    }

    console.log("session", session);

    return getUserByEmail(session.user.email);
  } catch (error) {
    console.log(error);
  }
};
