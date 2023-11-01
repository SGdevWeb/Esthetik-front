//
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    setShouldRedirect(true);
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Temps en secondes

      if (decodedToken.exp < currentTime) {
        logout();
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000; // Temps en millisecondes
        const timeout = setTimeout(() => {
          logout();
        }, timeUntilExpiry);

        return () => clearTimeout(timeout);
      }
    }
  }, [token, logout]);

  useEffect(() => {
    if (shouldRedirect) {
      setShouldRedirect(false);
    }
  }, [shouldRedirect]);

  return (
    <AuthContext.Provider value={{ token, login, logout, shouldRedirect }}>
      {children}
    </AuthContext.Provider>
  );
}
