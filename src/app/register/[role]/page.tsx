import { TUserRole } from "@/constants/enums";
import SignupForm from "../_components/signup-form";

interface RegisterPageProps {
  params: {
    role: TUserRole;
  };
}

const RegisterPage = ({ params: { role } }: RegisterPageProps) => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role} />
      </div>
    </div>
  );
};
export default RegisterPage;
