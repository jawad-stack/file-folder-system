/* eslint-disable */
// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create Context
const AuthContext = createContext();

// Custom Hook to use Auth
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component to wrap your app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
