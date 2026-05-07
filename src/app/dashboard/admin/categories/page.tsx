import { requireDashboardRole } from "@/lib/dashboard-auth";
import { getCategories } from "@/services/category-services";
import columns from "./_components/columns";
import DataTable from "./_components/data-table";

const AdminCategoriesPage = async () => {
  await requireDashboardRole(["admin"]);
  const categories = await getCategories();

  console.log("Fetched categories:", categories);

  return (
    <div className="rounded-md border overflow-hidden p-6">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default AdminCategoriesPage;
