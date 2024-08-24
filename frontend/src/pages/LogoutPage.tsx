import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../store/AuthenticationContext";
import { deleteCookie } from "../shared/utils";

export default function LogoutPage() {
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    setIsAuthenticated(false);

    deleteCookie("access");
    deleteCookie("refresh");
  }, [setIsAuthenticated]);

  return <Navigate to="/login" replace />;
}
