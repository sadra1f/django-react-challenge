import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import AuthenticationContextProvider from "./store/AuthenticationContext";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import RequireAuth from "./components/shared/RequireAuth";
import NotAuth from "./components/shared/NotAuth";
import Loading from "./components/shared/Loading";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));

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
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
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
