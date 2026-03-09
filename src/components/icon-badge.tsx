import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-emerald-100",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        xs: "p-1",
        sm: "p-1",
        md: "p-2",
        lg: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-emerald-600",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
      xs: "h-4 w-4",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  variant?: "default" | "success";
  size?: "default" | "xs" | "sm" | "md" | "lg";
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};
