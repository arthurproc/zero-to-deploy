import { addDoc, collection } from "firebase/firestore";
import CreateQAEventForm from "../components/create-qaevent-form";
import { QAEvent } from "../types";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleCreateQAEvent = async (eventData: QAEvent) => {
    try {
      const docRef = await addDoc(collection(db, 'events'), eventData);
      navigate(`/event/${docRef.id}`);
    } catch(error) {
      console.log('deu ruim');
    }
  };

  return (
    <div>
      Dashboard
      <CreateQAEventForm onSubmit={handleCreateQAEvent} />
    </div>
  );
}
export default Dashboard