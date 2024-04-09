import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { linkTo } from "@/layouts/side-menu";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import Menu from "../../Entity/Menu";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/ApiUrls";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state?.themeid;

  const [formattedMenu, setFormattedMenu] = useState<Menu | null>(null);

  const fetchDataAndUpdateMenu = async () => {
    try {
      console.log(menuId)
      const menuData = await apiService.get(ApiUrls.GETMENUBYID + menuId);
      setFormattedMenu(menuData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateMenu();
    document.body.classList.remove("error-page", "login");
    document.body.classList.add("main");
  }, []);

  return (
    <div className="py-5 md:py-0">
      <DarkModeSwitcher />
      <MobileMenu />
      <TopBar  colorMenu={formattedMenu?.colorMenu}  className="top-bar-boxed" />
 
      <nav className="top-nav" style={{paddingTop:'99px'}}>
        <ul style={{backgroundColor:'#6C0345'}}>
          {formattedMenu?.menuLabels.map((menuLabels, menuKey) => (
            <li style={{ margin: '20px' }} key={menuKey}>:
              <a
                href={menuLabels.subMenus ? "#" : menuLabels.pathname}
                className={classnames({
                  "top-menu": true,
                  "top-menu--active": menuLabels.title,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  linkTo(menuLabels, navigate);
                }}
              >
                <div className="top-menu__icon">
                  <Lucide icon={menuLabels.icon} />
                </div>
                <div className="top-menu__title">
                  {menuLabels.title}
                  {menuLabels.subMenus && (
                    <Lucide icon="ChevronDown" className="top-menu__sub-icon" />
                  )}
                </div>
              </a>
              {/* BEGIN: Second Child */}
              {menuLabels.subMenus && (
                <ul>
                  {menuLabels.subMenus.map((subMenu, subMenuKey) => (
                    <li key={subMenuKey}>
                      <a
                        href={menuLabels.subMenus ? "#" : subMenu.pathname}
                        className="top-menu"
                        onClick={(event) => {
                          event.preventDefault();
                          linkTo(subMenu, navigate);
                        }}
                      >
                        <div className="top-menu__icon">
                          <Lucide icon="Activity" />
                        </div>
                        <div className="top-menu__title">
                          {subMenu.title}
                          {menuLabels.subMenus && (
                            <Lucide
                              icon={subMenu.icon}
                              className="top-menu__sub-icon"
                            />
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {/* END: Second Child */}
            </li>
          ))}
        </ul>
      </nav>
     
      <div className="content content--top-nav">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
