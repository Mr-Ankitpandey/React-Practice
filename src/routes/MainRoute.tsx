import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import StatePage from "../pages/StatePage";
import ContextPage from "../pages/ContextPage"
import ReduxPage from "../pages/ReduxPage";
import ErrorPage from "../pages/ErrorPage";

 const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage/>,
      children: [
        {
          index : true,
          element: <StatePage />,
        },
        {
          path: "state",
          element: <StatePage />,
        },
        {
          path: "context",
          element: <ContextPage />,
        },
        {
          path: "rtk",
          element: <ReduxPage />,
        }
      ],
    },
  ]);


const MainRoute = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default MainRoute;
