import { useState } from "react";

type EventQuestionFormProps = {
  handleSend: (message: string) => void;
};

function EventQuestionForm({ handleSend }: EventQuestionFormProps) {
  const [message, setMessage] = useState<string>('');

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // trim()
    if (message.trim() === '') {
      return;
    }

    handleSend(message);
    setMessage('');
  };

  return (
    <form
      className="bg-gray-800 w-full p-6 rounded-lg shadow-md flex items-center" onSubmit={submit}
    >
      <input
        type="text"
        id="message"
        name="message"
        placeholder="Entre com sua mensagem"
        onChange={event => setMessage(event.target.value)}
        value={message}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-gray-500 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 ml-2 rounded bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        Enviar
      </button>
    </form>
  );
}
export default EventQuestionForm