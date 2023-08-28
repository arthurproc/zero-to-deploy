import { useEffect, useState } from "react";
import AuthContext from "./auth.context"
import { User } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
    } catch(error: any) {
      setErrorMessage(error?.message ?? 'Erro desconhecido');
    };
  }

  const loggedIn = user ? true : false;


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    // quando o componente for sair da tela
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{
      user,
      loggedIn: loggedIn,
      loginWithGoogle,
      errorMessage,
      logout: async () => setUser(null)
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
