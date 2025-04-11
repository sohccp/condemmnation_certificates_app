import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, value }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(value?.isAuthenticated || false);

  const login = async (username, password) => {
    // In a real app, this would make an API call to verify credentials
    // For now, we'll simulate a successful login
    if (username && password) {
      const userData = {
        id: 1,
        username,
        fullName: 'Test User',
        role: 'technician',
        department: 'Surgery'
      };
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
