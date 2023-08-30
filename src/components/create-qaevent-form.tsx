import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { QAEvent } from "../types";

type CreateQAEventFormProps = {
  onSubmit: (createdEvent: QAEvent) => void;
}

function CreateQAEventForm({ onSubmit }: CreateQAEventFormProps) {
  const { user } = useAuth();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const newEventData = {
      title: eventName,
      description: eventDescription,
      creatorId: user?.uid,
      createdAt: new Date(),
    };
    onSubmit(newEventData);
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-left">
      <h2 className="text-2xl text-white">
        Novo evento
      </h2>
      <form className="flex flex-col mt-3 gap-3" onSubmit={handleCreateEvent}>
        <input
          type="text"
          id="eventName"
          name="eventName"
          placeholder="Nome do evento"
          value={eventName}
          onChange={event => setEventName(event.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-gray-500 focus:outline-none"
        />
        <textarea
          id="eventDescription"
          name="eventDescription"
          placeholder="Descrição do evento"
          value={eventDescription}
          onChange={event => setEventDescription(event.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-gray-500 focus:outline-none"
        />
        <button
          className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Criar evento
        </button>
      </form>
    </div>
  );
}
export default CreateQAEventForm