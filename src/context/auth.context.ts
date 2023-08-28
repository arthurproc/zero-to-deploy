import { User } from "firebase/auth";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: User | null;
  loggedIn: boolean;
  errorMessage: string | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
