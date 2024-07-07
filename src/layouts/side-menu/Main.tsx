import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu as AntdMenu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import TopBar from "@/components/top-bar/Main";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Menu from "../../Entity/Menu";
import MenuLabel from "../../Entity/MenuLabel";
import "./Main.css"; // Import your custom CSS file
import React from "react";

const { SubMenu } = AntdMenu;

function Main() {
  const navigate = useNavigate();
  const menuId = localStorage.getItem("themid");
  const [formattedMenu, setFormattedMenu] = useState<Menu | null>(null);

  const fetchDataAndUpdateMenu = async () => {
    try {
      const menuData = await apiService.get(ApiUrls.GETMENUBYID + menuId);
      setFormattedMenu(menuData);
    } catch (error) { 
      console.error("Error fetching menu data:", error);
    }
  };

  const handleMenuClick = (menuu: MenuLabel) => {
    if (menuu.subMenus.length === 0) {
      navigate(menuu.pathname);
    } else if (formattedMenu) {
      const updatedFormattedMenu = { ...formattedMenu };
      const menuLabelIndex = updatedFormattedMenu.menuLabels.findIndex(
        (label) => label.id === menuu.id
      );
      if (menuLabelIndex !== -1) {
        updatedFormattedMenu.menuLabels[menuLabelIndex].activeDropdown =
          !updatedFormattedMenu.menuLabels[menuLabelIndex].activeDropdown;
        setFormattedMenu(updatedFormattedMenu);
      }
    }
  };

  useEffect(() => {
    fetchDataAndUpdateMenu();
    document.body.classList.remove("error-page", "login");
    document.body.classList.add("main");
  }, []);

  return (
    <div className="main-container" >
      <TopBar color={formattedMenu?.colorMenu} />
      <div className="flex overflow-hidden">
        <AntdMenu mode="inline" style={{ width: 256 }}>
          {formattedMenu?.menuLabels.map((menu) =>
            menu.title === "devider" ? (
              <AntdMenu.Divider key={menu.id} />
            ) : menu.subMenus.length > 0 ? (
              <SubMenu
                key={menu.id}
                title={
                  <span>
                    <MenuFoldOutlined onClick={() => navigate(menu.pathname)} />
                    <span onClick={() => handleMenuClick(menu)}>
                      {menu.title}
                    </span>
                  </span>
                }
              >
                {menu.subMenus.map((subMenu) => (
                  <AntdMenu.Item
                    key={subMenu.id}
                    onClick={() => navigate(subMenu.pathname)}
                  >
                    {subMenu.title}
                  </AntdMenu.Item>
                ))}
              </SubMenu>
            ) : (
              <AntdMenu.Item
                key={menu.id}
                onClick={() => handleMenuClick(menu)}
              >
                <MenuUnfoldOutlined onClick={() => navigate(menu.pathname)} />
                <span>{menu.title}</span>
              </AntdMenu.Item>
            )
          )}
        </AntdMenu>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
