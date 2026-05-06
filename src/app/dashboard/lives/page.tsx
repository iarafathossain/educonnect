import { getLoggedInUser } from "@/lib/get-loggedin-user";
import { getLivesByInstructor } from "@/services/live-services";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const LivesPage = async () => {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    return <div className="p-6">Please log in to view your live sessions</div>;
  }

  const lives = await getLivesByInstructor(loggedInUser.id);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={lives} />
    </div>
  );
};

export default LivesPage;
