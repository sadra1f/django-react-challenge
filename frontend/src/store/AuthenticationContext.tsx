import axios from "axios";
import { createContext, type ReactNode, useEffect, useState } from "react";
import { API_ROOT } from "../shared/const";
import { deleteCookie, getAuthHeaders } from "../shared/utils";

export const AuthenticationContext = createContext<{
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (auth: boolean) => any;
  updateAuthenticationStatus: () => void;
}>({
  isAuthenticated: undefined,
  setIsAuthenticated: (auth) => auth,
  updateAuthenticationStatus: () => {},
});

export default function AuthenticationContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(undefined!);

  useEffect(() => {
    updateAuthenticationStatus();
  }, []);

  function updateAuthenticationStatus() {
    axios
      .get(API_ROOT + "/auth/users/me/", {
        headers: { ...getAuthHeaders() },
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);

        deleteCookie("access");
        deleteCookie("refresh");
      });
  }

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, updateAuthenticationStatus }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
