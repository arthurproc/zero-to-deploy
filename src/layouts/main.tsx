import { Link, Outlet } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { QAEvent } from "../types";
import { useAuth } from "../context/auth.context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

function MainLayout() {
  // começa com nulo e depois muda pra { ...dados de susuário }
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [userEvents, setUserEvents] = useState<QAEvent[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, 'events'),
        where('creatorId', '==', user?.uid),
      );


      const eventsSnapshot = await getDocs(eventsQuery);

      const events: QAEvent[] = [];

      if (!eventsSnapshot.empty) {
        eventsSnapshot.forEach((doc) => {
          const event = doc.data();

          events.push({
            id: doc.id,
            creatorId: event.creatorId,
            description: event.description,
            title: event.title,
            createdAt: event.createdAt.toDate(),
          });
        });

        setUserEvents(events);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <>
      <Header onToggleSidebar={ () => setShowSidebar(!showSidebar) } />
      <div className="flex h-screen mt-16">
        {
          showSidebar && (
            <div className="fixed top-16 left-0 w-64 bg-gray-800 h-screen p-6 z-10">
              <h2 className="text-white text-xl font-bold mb-4">Meus Eventos</h2>

              <ul className="space-y-4">
                {
                  userEvents.map((event) => (
                    <li className="flex justify-between items-center">
                      <Link to={`/event/manage/${event.id}`}>{event.title}</Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }

        <main className={`flex-1 p-8 overflow-y-auto ${showSidebar && 'ml-64'}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
