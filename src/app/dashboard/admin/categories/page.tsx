import { requireDashboardRole } from "@/lib/dashboard-auth";
import { getCategories } from "@/services/category-services";

const AdminCategoriesPage = async () => {
  await requireDashboardRole(["admin"]);
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Icon</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: { id: string; title: string; icon: string }) => (
              <tr key={category.id} className="border-t">
                <td className="px-4 py-3">{category.title}</td>
                <td className="px-4 py-3">{category.icon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
