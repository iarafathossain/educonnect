import { auth } from "@/auth";
import { getUserDetails } from "@/services/user-services";
import { redirect } from "next/navigation";
import ChangePassword from "../_components/change-password";
import ContactInfo from "../_components/contact-info";
import PersonalDetails from "../_components/personal-details";

const ProfilePage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const user = await getUserDetails(userId);

  return (
    <>
      <PersonalDetails userInfo={user} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo userInfo={user} />
          <ChangePassword email={user.email} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
