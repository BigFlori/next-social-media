import { auth } from "@/firebase/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState, createContext } from "react";

type UserContextType = {
  user: FirebaseUser | null;
  isLoading: boolean;
  loggedIn: boolean;
  setUser: (user: FirebaseUser | null) => void;
  signOut: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  loggedIn: false,
  setUser: () => {},
  signOut: () => {},
});

const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const router = useRouter();
  const [user, setUserState] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);
  
  const setUser = (user: FirebaseUser | null) => {
    setUserState(user);
  };

  const signOut = () => {
    auth.signOut();
  };

  const loggedIn = user !== null;

  const contextValue: UserContextType = {
    user: user,
    isLoading: isLoading,
    loggedIn: loggedIn,
    setUser: setUser,
    signOut: signOut,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
