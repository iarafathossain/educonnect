"use client";

import { createCategory } from "@/actions/admin-category-actions";
import Field from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iconMapper } from "@/lib/icon-mapper";
import {
  CreateCategoryPayload,
  createCategoryZodSchema,
} from "@/validators/category-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const categoryIconHints = [
  {
    keywords: [
      "web",
      "website",
      "frontend",
      "backend",
      "development",
      "coding",
      "programming",
      "app",
      "software",
    ],
    icon: "Code",
  },
  {
    keywords: [
      "data",
      "science",
      "analytics",
      "analysis",
      "statistics",
      "chart",
      "machine",
    ],
    icon: "BarChart",
  },
  {
    keywords: [
      "design",
      "ui",
      "ux",
      "graphic",
      "creative",
      "art",
      "illustration",
    ],
    icon: "PenTool",
  },
  {
    keywords: [
      "marketing",
      "seo",
      "growth",
      "social",
      "ads",
      "advertising",
      "promotion",
    ],
    icon: "Megaphone",
  },
  {
    keywords: [
      "business",
      "finance",
      "startup",
      "entrepreneur",
      "management",
      "sales",
    ],
    icon: "Briefcase",
  },
  {
    keywords: [
      "personal",
      "self",
      "motivation",
      "mindset",
      "productivity",
      "development",
    ],
    icon: "User",
  },
  {
    keywords: ["video", "media", "film", "editing", "production", "stream"],
    icon: "Video",
  },
  {
    keywords: ["writing", "copy", "content", "blog", "journal", "story"],
    icon: "BookOpen",
  },
];

const getSuggestedCategoryIcon = (title: string) => {
  const normalizedTitle = title.trim().toLowerCase();

  if (!normalizedTitle) {
    return "HelpCircle";
  }

  const titleMatch = categoryIconHints.find(({ keywords }) =>
    keywords.some((keyword) => normalizedTitle.includes(keyword)),
  );

  if (titleMatch) {
    return titleMatch.icon;
  }

  const courseCategoryMatch = [
    { title: "web development", icon: "Code" },
    { title: "data science", icon: "BarChart" },
    { title: "design", icon: "PenTool" },
    { title: "marketing", icon: "Megaphone" },
    { title: "business", icon: "Briefcase" },
    { title: "personal development", icon: "User" },
  ].find(({ title: categoryTitle }) => normalizedTitle.includes(categoryTitle));

  return courseCategoryMatch?.icon ?? "HelpCircle";
};

interface AddCategoryProps {
  onSuccess?: () => void;
}

const AddCategory = ({ onSuccess }: AddCategoryProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryPayload>({
    resolver: zodResolver(createCategoryZodSchema),
    defaultValues: {
      title: "",
      icon: "",
    },
  });

  const title = watch("title");
  const suggestedIcon = useMemo(() => getSuggestedCategoryIcon(title), [title]);

  useEffect(() => {
    setValue("icon", suggestedIcon, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue, suggestedIcon]);

  const iconFieldProps = register("icon");
  const IconPreview = iconMapper(suggestedIcon);

  const onSubmit = async (payload: CreateCategoryPayload) => {
    const result = await createCategory(payload);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Category created successfully!");
    reset({ title: "", icon: "" });
    onSuccess?.();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isSubmitting} aria-busy={isSubmitting}>
        <div className="grid gap-4">
          <Field error={errors.title}>
            <Label htmlFor="title">Category title</Label>
            <Input
              {...register("title")}
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Web Development"
            />
          </Field>
          <input type="hidden" {...iconFieldProps} />
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-3">
              <IconPreview className="h-4 w-4 text-muted-foreground" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  Auto-selected icon
                </p>
                <p>{suggestedIcon}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating category..." : "Create category"}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default AddCategory;
