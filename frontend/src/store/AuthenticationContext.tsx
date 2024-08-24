import { createContext } from "react";

export const AuthenticationContext = createContext<{
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (auth: boolean) => any;
  updateAuthenticationStatus: () => void;
}>({
  isAuthenticated: undefined,
  setIsAuthenticated: (auth) => auth,
  updateAuthenticationStatus: () => {},
});
