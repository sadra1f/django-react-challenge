import { ReactNode, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../store/AuthenticationContext";

export default function NotAuth({ children }: { children?: ReactNode }) {
  const { isAuthenticated, updateAuthenticationStatus } =
    useContext(AuthenticationContext);

  useEffect(() => {
    updateAuthenticationStatus();
  }, [updateAuthenticationStatus]);

  // return children;
  return isAuthenticated === undefined ? (
    <div className="flex min-h-screen w-full items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}
