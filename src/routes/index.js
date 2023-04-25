import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import { FreeAccessRoutes } from './free.access.routes';
import { PrivateAccessRoutes } from './private.access.routes';

export const Routes = () => {
  const { auth } = useAuth();

  function AuthRoutes() {
    if (auth?.user === null || auth?.user === undefined) {
      return <FreeAccessRoutes />;
    } else {
      return <PrivateAccessRoutes />;
    }
  }

  return AuthRoutes();
};
