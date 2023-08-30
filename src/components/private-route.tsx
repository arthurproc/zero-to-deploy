import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

type PrivateRouteProps = {
  component: React.ReactNode;
};

function PrivateRoute({ component }: PrivateRouteProps) {
  const { loggedIn } = useAuth();

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

  return component;
}

export default PrivateRoute;
