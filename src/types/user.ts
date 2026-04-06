import { TUserRole } from "@/constants/enums";

export type TSessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  image?: string;
  phone?: string;
  designation?: string;
};
