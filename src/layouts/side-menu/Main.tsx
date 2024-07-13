import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu as AntdMenu, Input } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import TopBar from "@/components/top-bar/Main";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Menu from "../../Entity/Menu";
import MenuLabel from "../../Entity/MenuLabel";
import "./Main.css"; // Import your custom CSS file

const { SubMenu } = AntdMenu;

function Main() {
  const navigate = useNavigate();
  const menuId = localStorage.getItem("themid");
  const [formattedMenu, setFormattedMenu] = useState<Menu | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  // Filter menu labels based on search term
  const filteredMenuLabels = formattedMenu?.menuLabels.filter((menu) =>
    menu.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-container">
      <TopBar color={formattedMenu?.colorMenu} />
      <div className="flex overflow-hidden">
        <AntdMenu mode="inline" style={{ width: 300 }}>
          <Input
            placeholder="Search.."
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear

            style={{
              color: "blue",
              borderColor: "blue",
              fontSize:15,
              marginTop:10,
              marginLeft:1,
              
            
            }}
          />
          {filteredMenuLabels?.map((menu) =>
            menu.title === "devider" ? (
              <AntdMenu.Divider key={menu.id} />
            ) : menu.subMenus.length > 0 ? (
              <SubMenu
                key={menu.id}
                title={
                  <span onClick={() => handleMenuClick(menu)}>
                    {menu.title}
                  </span>
                }
              >
                {menu.subMenus.map((subMenu) => (
                  <AntdMenu.Item
                    key={subMenu.id}
                    onClick={() => navigate(subMenu.pathname)}
                      className="sub-border"
                  >
                    {subMenu.title}
                  </AntdMenu.Item>
                ))}
              </SubMenu>
            ) : (
              <AntdMenu.Item key={menu.id} onClick={() => handleMenuClick(menu)} className="blue-border">
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
