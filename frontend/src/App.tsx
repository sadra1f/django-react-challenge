import axios from "axios";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import { AuthenticationContext } from "./store/AuthenticationContext";
import { API_ROOT } from "./shared/const";
import { deleteCookie, getAuthHeaders } from "./shared/utils";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./components/shared/RequireAuth";
import NotAuth from "./components/shared/NotAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: (
      <DefaultLayout>
        <ErrorPage />
      </DefaultLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: (
          <NotAuth>
            <LoginPage />
          </NotAuth>
        ),
      },
      { path: "logout", element: <LogoutPage /> },
      {
        path: "signup",
        element: (
          <NotAuth>
            <SignupPage />
          </NotAuth>
        ),
      },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
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
      <RouterProvider router={router} />
    </AuthenticationContext.Provider>
  );
}

export default App;
