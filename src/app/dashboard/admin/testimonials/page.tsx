import { requireDashboardRole } from "@/lib/dashboard-auth";
import { getAllTestimonialsForAdmin } from "@/services/testimonial-services";

const AdminTestimonialsPage = async () => {
  await requireDashboardRole(["admin"]);
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Testimonials</h1>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Review</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-t">
                <td className="px-4 py-3">{testimonial.userName}</td>
                <td className="px-4 py-3">{testimonial.courseTitle}</td>
                <td className="px-4 py-3">{testimonial.rating}</td>
                <td className="px-4 py-3">{testimonial.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestimonialsPage;
