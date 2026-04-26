import "@/models/user-model";

import { auth } from "@/auth";
import { getUserDetails } from "@/services/user-services";
import { redirect } from "next/navigation";
import AccountMenu from "./account-menu";
import UpdateAvatar from "./update-avatar";

const AccountSidebar = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const userId = session.user.id;
  const user = await getUserDetails(userId);

  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="relative">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <div className="profile-pic text-center mb-5">
            <input
              id="pro-img"
              name="profile-image"
              type="file"
              className="hidden"
            />
            <div>
              <UpdateAvatar user={user} />
              <div className="mt-4">
                <h5 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h5>
                <p className="text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
