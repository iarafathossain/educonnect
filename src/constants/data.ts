// course category data with title and lucide icon name
export interface CourseCategory {
  title: string;
  icon: string;
}

export const courseCategories: CourseCategory[] = [
  { title: "Web Development", icon: "Code" },
  { title: "Data Science", icon: "BarChart" },
  { title: "Design", icon: "PenTool" },
  { title: "Marketing", icon: "Megaphone" },
  { title: "Business", icon: "Briefcase" },
  { title: "Personal Development", icon: "User" },
];
