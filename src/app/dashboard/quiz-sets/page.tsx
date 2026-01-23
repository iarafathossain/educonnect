import { quizQueries } from "@/queries/quiz";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const quizSets = [
  {
    id: 1,
    title: "Reactive Accelerator",
    isPublished: true,
    totalQuiz: 10,
    quizes: [],
  },
  {
    id: 2,
    title: "Think In A Redux Way",
    isPublished: false,
    totalQuiz: 50,
    quizes: [],
  },
];

const QuizSetsPage = async () => {
  const quizzes = await quizQueries.getAllQuiSets(false);
  const mappedQuizzes =
    quizzes?.map((quizSet) => ({
      id: quizSet._id,
      title: quizSet.title,
      isPublished: quizSet.active,
      totalQuiz: quizSet.quizIds.length,
    })) || [];

  return (
    <div className="p-6">
      <DataTable columns={columns} data={mappedQuizzes} />
    </div>
  );
};

export default QuizSetsPage;
