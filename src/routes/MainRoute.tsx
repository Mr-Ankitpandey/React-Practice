import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../pages/RootLayoutPage/index";
import StatePage from "../pages/StatePage/index";
import ContextPage from "../pages/ContextPage/index"
import ReduxPage from "../pages/ReduxPage/index";
import ErrorPage from "../pages/ErrorPage/index";

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
