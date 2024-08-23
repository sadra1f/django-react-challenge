import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./components/RequireAuth";

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
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
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
  return <RouterProvider router={router} />;
}

export default App;
