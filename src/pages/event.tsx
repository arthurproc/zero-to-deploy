import { useEffect, useState } from "react";
import EventQuestionForm from "../components/event-question-form";
import EventQuestion from "../components/event-question";
import { Question } from "../types";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/auth.context";

function Event() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSend = async (message: string) => {
    if (!user) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question: message,
        authorId: user.uid,
        author: user.displayName,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const questionsQuery = query(collection(db, "questions"), orderBy('createdAt'));

    const unsub = onSnapshot(questionsQuery, (querySnapshot) => {
      const newQuestions: Question[] = [];
      querySnapshot.forEach((doc) => {
        const question = doc.data();
        newQuestions.push({
          ...question,
          createdAt: question.createdAt.toDate(),
        } as Question);
      });

      setQuestions(newQuestions);
    });

    return unsub;
  }, []);

  return (
    <div className="container m-auto">
      <div className="flex justify-center items-center mt-20">
        <EventQuestionForm handleSend={handleSend} />
      </div>
      <div className="flex flex-col justify-center items-center">
        {
          questions.map((question, index) => (
            <EventQuestion key={index} question={question} />
          ))
        }
      </div>
    </div>
  );
}
export default Event;
