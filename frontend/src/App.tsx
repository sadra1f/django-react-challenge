import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import AuthenticationContextProvider from "./store/AuthenticationContext";

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
  return (
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  );
}

export default App;
