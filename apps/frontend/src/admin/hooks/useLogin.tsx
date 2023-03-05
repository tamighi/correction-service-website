import React from "react";
import { authProvider, ICredentials } from "admin/api/authProvider";
import { useAuthContext } from "admin/providers/AuthProvider";

export const useLogin = () => {
  const authContext = useAuthContext();

  const login = React.useCallback(
    async (credentials: ICredentials) => {
      try {
        await authProvider.login(credentials);
        authContext?.setAuthenticated(true);
      } catch (error) {
        throw error;
      }
    },
    [authContext]
  );

  const logout = React.useCallback(
    async (credentials: ICredentials) => {
      try {
        // await authProvider.logout(credentials);
        authContext?.setAuthenticated(false);
      } catch (error) {
        throw error;
      }
    },
    [authContext]
  );
  return { login, logout };
};