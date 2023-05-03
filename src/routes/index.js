import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import { FreeAccessRoutes } from './free.access.routes';
import { PrivateAccessRoutes } from './private.access.routes';

import { getData } from '../storages/userStorage';

export const Routes = () => {
  const { auth, saveAuthData } = useAuth();

  async function handleAuthData() {
    const storage = await getData();
    if (storage) {
      setTimeout(() => saveAuthData(storage), 200);
    }
  }

  useEffect(() => {
    handleAuthData();
  }, []);

  function AuthRoutes() {
    if (auth?.user === null || auth?.user === undefined) {
      return <FreeAccessRoutes />;
    } else {
      return <PrivateAccessRoutes />;
    }
  }

  return AuthRoutes();
};
