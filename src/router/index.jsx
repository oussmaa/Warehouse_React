import { useRoutes, Navigate } from "react-router-dom";
import AddMenu from "@/views/ManagementMenu/AddMenu/Main";
import ListMenu from "@/views/ManagementMenu/ListMenu/Main";

import ListMenuLabel from "@/views/ManagementMenuLabel/ListMenuLabels/Main";
import ListSubMenu from "@/views/ManagementSubMenu/ListSubMenu/Main";

import SideMenu from "../layouts/side-menu/Main";

import AddMenuLabel from "@/views/ManagementMenuLabel/AddMenuLabel/Main";

import Login from "../views/login/Main";

import AddSubMenu from "@/views/ManagementSubMenu/AddSubMenu/Main";

import Profile from "@/views/Profile/Main";

import ListUsers from "@/views/ManagementUser/ListUsers/Main";
import AddUsers from "@/views/ManagementUser/AddUsers/Main"; 
import UpdateUsers from "@/views/ManagementUser/UpdateUsers/Main";


import AddArticles from "@/views/ManagementArticle/AddArticles/Main";
import ListArticles from "@/views/ManagementArticle/ListArticles/Main";

import AddGlobalestock from "@/views/ManagementGlobalStock/AddGlobalestock/Main";
import ListGlobalestock from "@/views/ManagementGlobalStock/ListGlobalStock/Main";

import AddGoodsReceipt from "@/views/ManagementGoodsReceipt/AddGoodsReceipt/Main";
import ListGoodsReceipt from "@/views/ManagementGoodsReceipt/ListGoodsReceipt/Main";

import AddGoodsReceiptPos from "@/views/ManagementGoodsReceipt/AddGoodsReceipt/Main";
import ListGoodsReceiptPos from "@/views/ManagementGoodsReceiptPos/ListGoodsReceiptPos/Main";

import OrderStock from "@/views/ManagementOrderStock/OrderStock/Main";
import ListOrderStock from "@/views/ManagementOrderStock/ListOrderStock/Main";

import AddSupplier from "@/views/ManagementSupplier/AddSupplier/Main";
import ListSupplier from "@/views/ManagementSupplier/ListSupplier/Main";

function Router() {
  var isAuthenticated = false;

  const token = localStorage.getItem("token");

  if (token !== null) {
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
          path: "updateusers",
          element: <UpdateUsers />,
        },
        {
          path: "listsupplier",
          element: <ListSupplier />,
        },
        {
          path: "addsupplier",
          element: <AddSupplier />,
        },
        {
          path: "addorderstock",
          element: <OrderStock />,
        },
        {
          path: "addstock",
          element: <AddGlobalestock />,
        },
        {
          path: "liststock",
          element: <ListGlobalestock />,
        },
        {
          path: "listorderstock",
          element: <ListOrderStock />,
        },
        {
          path: "addgoodsreceipt",
          element: <AddGoodsReceipt />,
        },
        {
          path: "listgoodsreceipt",
          element: <ListGoodsReceipt />,
        },        
        {
          path: "addgoodsreceiptpos",
          element: <AddGoodsReceiptPos />,
        },
        {
          path: "listgoodsreceiptpos",
          element: <ListGoodsReceiptPos />,
        },        
        {
          path: "addarticle",
          element: <AddArticles />,
        },
        {
          path: "listarticle",
          element: <ListArticles />,
        },
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
