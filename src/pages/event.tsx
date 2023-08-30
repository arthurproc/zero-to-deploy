import { useEffect, useState } from "react";
import EventQuestionForm from "../components/event-question-form";
import EventQuestion from "../components/event-question";
import { QAEvent, Question } from "../types";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/auth.context";
import { useParams } from "react-router-dom";
import useEventData from "../hooks/use-event-data";

function Event() {
  const { user } = useAuth();
  const { eventId } = useParams();
  const { QAevent, questions } = useEventData(eventId);
 
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
