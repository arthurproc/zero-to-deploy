import { NavLink, useNavigate } from "react-router-dom";
import Button from "./form-elements/button";
import { useAuth } from "../context/auth.context";

type HeaderProps = {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const { logout, loggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 shadow-lg z-10 h-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <button
            className="text-white focus:outline-none"
            onClick={ onToggleSidebar }
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
              />
            </svg>
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/dashboard" className="text-white hover:text-gray-300 mr-2">
                Dashboard
              </NavLink>
              {
                loggedIn ? (
                  <Button
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => navigate('/')}
                  >
                    Login
                  </Button>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
