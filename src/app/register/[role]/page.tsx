import SignupForm from "../_components/signup-form";

const RegisterPage = ({ params: { role } }: { params: { role: string } }) => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role} />
      </div>
    </div>
  );
};
export default RegisterPage;
