import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap the application and provide auth state
export default function AuthProvider({ children }) {
  // Initialize the authUser state with data from localStorage (if available)
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Users");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  // Save the authUser state to localStorage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
