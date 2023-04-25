import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const deleteAuthData = () => {
    setAuth(null);
  };

  const saveAuthData = values => {
    setAuth(values);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuthData,
        deleteAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { auth, setAuth, saveAuthData, deleteAuthData } = context;
  return { auth, setAuth, saveAuthData, deleteAuthData };
}
