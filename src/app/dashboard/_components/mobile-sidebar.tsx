import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TUserRole } from "@/constants/enums";
import { MenuIcon } from "lucide-react";
import Sidebar from "./sidebar";

const MobileSidebar = ({ role }: { role: TUserRole }) => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar role={role} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
