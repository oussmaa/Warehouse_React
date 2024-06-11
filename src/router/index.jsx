import { useRoutes,Navigate  } from "react-router-dom";
import AddMenu from "../views/AddMenu/Main";
import ListMenu from "@/views/ListMenu/Main";
import ListMenuLabel from "@/views/ListMenuLabels/Main";
import ListSubMenu from "@/views/ListSubMenu/Main";
import SideMenu from "../layouts/side-menu/Main";
import AddMenuLabel from "@/views/AddMenuLabel/Main";
import Login from "../views/login/Main";
import AddSubMenu from "@/views/AddSubMenu/Main";
import Profile from "@/views/Profile/Main"
import ListUsers from "@/views/ListUsers/Main"
import AddUsers from "@/views/AddUsers/Main"

function Router() {
  
  var isAuthenticated = false;
  const token = localStorage.getItem('token');
 if  (token !== null)
  {
    isAuthenticated = true;
  }
  

  const routes = [

    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: isAuthenticated ? <SideMenu /> : <Navigate to="/" />,
      children: [
        {
          path: "addmenu",
          element: <AddMenu />,
        },
        {
          path: "addsubmenu",
          element: <AddSubMenu />,
        },
        {
          path: "listmenu",
          element: <ListMenu />,
        },
        {
          path: "listmenulabels",
          element: <ListMenuLabel />,
        },
        {
          path: "addmenulabels",
          element: <AddMenuLabel />,
        },
        {
          path: "listsubmenu",
          element: <ListSubMenu />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "listusers",
          element: <ListUsers />,
        },
        {
          path: "addusers",
          element: <AddUsers />,
        },       
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
