import SiteLogo from "@/components/logo";
import { TUserRole } from "@/constants/enums";
import Link from "next/link";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = ({ role }: { role?: TUserRole }) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href="/" className="p-6">
        <SiteLogo />
      </Link>
      <div className="flex flex-col w-full">
        <SidebarRoutes role={role} />
      </div>
    </div>
  );
};

export default Sidebar;
