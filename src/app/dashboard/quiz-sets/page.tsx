import { quizQueries } from "@/queries/quiz";
import { IQuizSetFrontend } from "@/types/frontend-index";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const QuizSetsPage = async () => {
  const quizzes = await quizQueries.getAllQuiSets(false);

  const mappedQuizzes: IQuizSetFrontend[] =
    quizzes?.map((quizSet) => ({
      id: quizSet.id,
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
