import "@/models/user-model";

import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import AccountMenu from "./account-menu";

const AccountSidebar = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  const user = session.user;

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
              <div className="relative size-28 mx-auto">
                <Image
                  src={user?.image || "/default-profile.png"}
                  className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                  id="profile-banner"
                  alt={`${user?.firstName} ${user?.lastName}`}
                  width={112}
                  height={112}
                />
                <label
                  className="absolute inset-0 cursor-pointer"
                  htmlFor="pro-img"
                />
              </div>
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
