import { getAllQuizSets } from "@/services/quiz-services";
import { IQuizSetFrontend } from "@/types/frontend-index";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const QuizSetsPage = async () => {
  const quizzes = await getAllQuizSets(false);

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
