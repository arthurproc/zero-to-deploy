import { Question } from "../types"

function EventQuestion({ question }: { question: Question }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md my-4 w-full">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-white">{question.author}</span>
        <span className="text-sm text-gray-400">{question.createdAt.toLocaleTimeString()}</span>
      </div>

      <p className="text-white mb-2">
        {question.question}
      </p>
    </div>
  );
}

export default EventQuestion;
