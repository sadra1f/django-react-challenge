import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_ROOT } from "../../shared/const";
import { getAuthHeaders } from "../../shared/utils";

export default function RequireAuth({ children }: { children?: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    axios
      .get(API_ROOT + "/auth/users/me/", {
        headers: { ...getAuthHeaders() },
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // return children;
  return isAuthenticated === undefined ? (
    <div className="flex min-h-screen w-full items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
