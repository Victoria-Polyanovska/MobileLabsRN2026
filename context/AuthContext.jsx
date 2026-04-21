import { useRouter } from 'expo-router';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = (email, password) => {
    if (email && password) {
      setIsAuthenticated(true);
      router.replace('/(app)'); 
    }
  };

  const register = (email, password, name) => {
    if (email && password && name) {
      setIsAuthenticated(true);
      router.replace('/(app)');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);