import { useEffect, useState } from "react";
import { QAEvent, Question } from "../types";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

export default function useEventData(eventId?: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [QAevent, setQAEvent] = useState<QAEvent | null>(null);

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


  return { questions, QAevent };
};

