import { ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../store/AuthenticationContext";

import Loading from "./Loading";

export default function NotAuth({ children }: { children?: ReactNode }) {
  const { isAuthenticated, updateAuthenticationStatus } = useContext(AuthenticationContext);

  useEffect(() => {
    updateAuthenticationStatus();
  }, [updateAuthenticationStatus]);

  // return children;
  return isAuthenticated === undefined ? (
    <Loading />
  ) : isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}
