import { useRoutes } from "react-router-dom";
import TopMenu from "../layouts/top-menu/Main";
 
import Page1 from "../views/page-1/Main";
import Page2 from "../views/page-2/Main";
import Login from "../views/login/Main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Login />

    },
    {
      path: "/dashbored",
      element: <TopMenu />,
      children: [
        {
          path: "page-1",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
      ],
    },
      
    
  ];

  return useRoutes(routes);
}

export default Router;
