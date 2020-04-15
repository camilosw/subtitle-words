import React, { useEffect, useState, createContext, useContext } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import { auth } from './firebase';

const AuthContext = createContext<firebase.User | null | undefined>(undefined);

export const useUser = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState<firebase.User | null | undefined>(
    undefined,
  );
  const history = useHistory();

  useEffect(() => {
    const unregister = auth.onAuthStateChanged(user => {
      setUserState(user);
      if (user) {
        history.push('/');
      }
    });
    return () => unregister();
  }, []);

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
