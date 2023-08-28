import { BsGoogle } from 'react-icons/bs';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const { loginWithGoogle, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/event');
    }
  }, [loggedIn]); 

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-96 flex flex-col justify-center items-center bg-gray-800 rounded py-4 px-4">
        <h2
          className='text-3xl text-white font-bold text-center mb-8'
        >
          Boas-vindas ao Ask32!!
        </h2>

        {!loggedIn && (
          <button
            onClick={loginWithGoogle}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Login with Google <BsGoogle className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
export default Login