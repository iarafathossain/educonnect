import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { redirect } from "next/navigation";
import ChangePassword from "../_components/change-password";
import ContactInfo from "../_components/contact-info";
import PersonalDetails from "../_components/personal-details";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userEmail = session?.user?.email;
  const loggedInUser = await getUserByEmail(userEmail!);

  return (
    <>
      <PersonalDetails userInfo={loggedInUser!} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo userInfo={loggedInUser!} />
          <ChangePassword email={userEmail!} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
