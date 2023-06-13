import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../views/LoginPage";
import { RegisterPage } from "../views/RegisterPage";
import { ViewPage } from "../views/ViewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/data",
    element: <ViewPage />,
  },
]);

export default router;
