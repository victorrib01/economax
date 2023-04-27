import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userCategories, setUserCategories] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userCategories,
        setUserCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  const { userCategories, setUserCategories } = context;
  return { userCategories, setUserCategories };
}
