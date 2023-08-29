import { useEffect, useState } from "react";
import EventQuestionForm from "../components/event-question-form";
import EventQuestion from "../components/event-question";
import { QAEvent, Question } from "../types";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";

function Event() {
  const { user, loggedIn } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [QAevent, setQAEvent] = useState<QAEvent | null>(null);
  const { eventId } = useParams();

  // busca as perguntas do evento
  // precisamos buscar as perguntas do evento de id = eventId
  useEffect(() => {
    if (!eventId) {
      return;
    }

    const questionsQuery = query(collection(db, `events/${eventId}/questions`), orderBy('createdAt'));

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
  }, [eventId]);


  useEffect(() => {
    if (!eventId) {
      return;
    }

    const fetchEventData = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // tenho os dados do firebase
        const docData = docSnap.data();

        setQAEvent({
          id: docData.id,
          title: docData?.title,
          description: docData?.description,
          createdAt: docData?.createdAt?.toDate(),
          creatorId: docData?.creatorId,
        });
      } else {
        console.log("Evento não encontrado!");
      }
    }

    fetchEventData();
  }, [eventId]);

  if (!loggedIn) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-96 flex flex-col justify-center items-center bg-gray-800 rounded py-4 px-4">
          <h2
            className='text-3xl text-white font-bold text-center mb-8'
          >
            Boas-vindas ao Ask32!!
          </h2>
          <Link
            to="/"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Realizar Login
          </Link>
        </div>
      </div>
    );
  }


  // daqui pra baixo, não vai ser executado
  const handleSend = async (message: string) => {
    if (!user) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `events/${eventId}/questions`), {
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

  return (
    <div className="container m-auto">
      <div className="flex-col justify-center items-center mt-20">
        <h2
          className="text-3xl text-center mb-6"
        >
          {QAevent?.title}
        </h2>
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
