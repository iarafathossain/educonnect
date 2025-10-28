import { Button } from "@/components/ui/button";
import Image from "next/image";

import { socialLoginAction } from "@/app/actions/auth";
import { GoogleIcon } from "@/assets";

const SocialLogins = () => {
  return (
    <>
      <div className="text-center text-md mt-3 text-gray-500">
        or Signup with
      </div>
      <form action={socialLoginAction}>
        <div className="flex justify-center gap-2">
          <Button
            className="mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
            type="submit"
            name="action"
            value="google"
          >
            <Image src={GoogleIcon} alt="google" width={30} height={30} />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default SocialLogins;
