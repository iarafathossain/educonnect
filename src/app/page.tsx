import Test from "@/components/Test";
import { getCourses } from "@/queries/courses";

const HomePage = async () => {
  const courses = await getCourses();
  console.log(courses, "courses");
  return (
    <div>
      <Test />
    </div>
  );
};

export default HomePage;
