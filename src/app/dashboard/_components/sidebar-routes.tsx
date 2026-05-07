"use client";

import { TUserRole } from "@/constants/enums";
import { BarChart, BookA, BookOpen, Radio } from "lucide-react";
import SidebarItem from "./sidebar-item";

const instructorRoutes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/dashboard/courses",
  },
  {
    icon: BookOpen,
    label: "Add Course",
    href: "/dashboard/courses/add",
  },
  {
    icon: Radio,
    label: "Lives",
    href: "/dashboard/lives",
  },
  {
    icon: BookA,
    label: "Quizes",
    href: "/dashboard/quiz-sets",
  },
];

const adminRoutes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Manage Categories",
    href: "/dashboard/admin/categories",
  },
  {
    icon: Radio,
    label: "Manage Users",
    href: "/dashboard/admin/users",
  },
  {
    icon: BookA,
    label: "Manage Testimonials",
    href: "/dashboard/admin/testimonials",
  },
];

type SidebarRoutesProps = {
  role?: TUserRole;
};

const SidebarRoutes = ({ role }: SidebarRoutesProps) => {
  const routes = role === "admin" ? adminRoutes : instructorRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={`${route.href}-${route.label}`}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
