import logo from "@/assets/lws_logo.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";
const SiteLogo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
  );
};

export default SiteLogo;
