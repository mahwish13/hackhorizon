import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { id, name, email, role, gstin }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (_) {}
    }
    setLoading(false);
  }, []);

  /**
   * login(userData, token)
   * userData: { id, name, email, role, gstin }
   */
  const login = (userData, newToken) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  /**
   * switchRole(newToken, newRole)
   * Updates the JWT and role when a user switches context (e.g. seller ↔ buyer).
   */
  const switchRole = (newToken, newRole) => {
    const updatedUser = { ...user, role: newRole };
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setToken(newToken);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
