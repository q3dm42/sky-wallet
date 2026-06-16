import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'sky-wallet-auth';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const login = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
