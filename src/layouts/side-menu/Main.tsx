import { Transition } from "react-transition-group";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "@/layouts/side-menu";
import { Lucide } from "@/base-components";
import classnames from "classnames";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import Menu from "../../Entity/Menu";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/ApiUrls";
import React from "react";
import MenuLabel from "../../Entity/MenuLabel";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = localStorage.getItem('themid');

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
  
 

  const Setrowtoyes = (menuu: MenuLabel) => {
    
 if(menuu.subMenus.length==0)
 {console.log(menuu)
navigate(menuu.pathname)
 }
else   if (formattedMenu) {
  // Make a copy of the formattedMenu object
  const updatedFormattedMenu: Menu = { ...formattedMenu };
  // Find the index of the MenuLabel object to update
  const menuLabelIndex = updatedFormattedMenu.menuLabels.findIndex(label => label.id === menuu.id);
  if (menuLabelIndex !== -1) {
    // Update the activeDropdown property with the new value
    updatedFormattedMenu.menuLabels[menuLabelIndex].activeDropdown = !updatedFormattedMenu.menuLabels[menuLabelIndex].activeDropdown;
    // Set the state with the updated object
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
    <div className="py-5 md:py-0">
      <DarkModeSwitcher />
       <MobileMenu />
      <TopBar />
      <div className="flex overflow-hidden">
        {/* BEGIN: Side Menu */}
        <nav className="side-nav">
 
          <ul>
            {/* BEGIN: First Child */}
            {formattedMenu?.menuLabels.map((menu, menuKey) =>
              menu.title == "devider" ? (
                <li
                  className="side-nav__devider my-6"
                  key={menu.id+ menuKey}
                ></li>
              ) : (
                <li key={menuKey}>
                  <SideMenuTooltip
                    tag="a"
                    content={menu.title}
                    href={menu.subMenus ? "#" : menu.pathname}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": menu.active,
                      "side-menu--open": menu.activeDropdown,
                    })}
                    onClick={(event:any) => {
                      event.preventDefault();     
                      setFormattedMenu($h.toRaw(formattedMenu));
                    }}
                  >
                    <div className="side-menu__icon">
                      <Lucide icon={menu.icon} />
                    </div>
                    <div className="side-menu__title"  onClick={ () => Setrowtoyes(menu)}>
                      {menu.title}
                     
                      {menu.subMenus && (
                        <div
                          className={classnames({
                            "side-menu__sub-icon": true,
                            "transform rotate-180": menu.activeDropdown,
                          })}
                        >
                          <Lucide icon="ChevronDown"  />
                        </div>
                      )}
                    </div>
                  </SideMenuTooltip>
                  {/* BEGIN: Second Child */}
                  {menu.subMenus && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={classnames({
                          "side-menu__sub-open": menu.activeDropdown,
                        })}
                      >
                        {menu.subMenus.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <SideMenuTooltip
                              tag="a"
                              content={subMenu.title}
                              href={subMenu.pathname ? "#" : subMenu.pathname}
                              className={classnames({
                                "side-menu": true,
                                "side-menu--active": menu.active,
                              })}
                              onClick={(event:any) => {
                                event.preventDefault();
                                linkTo(subMenu, navigate);
                                setFormattedMenu($h.toRaw(formattedMenu));
                              }}
                            >
                              <div className="side-menu__icon">
                                <Lucide icon="Activity" />
                              </div>
                              <div className="side-menu__title">
                                {subMenu.title}
                                {subMenu && (
                                  <div
                                    className={classnames({
                                      "side-menu__sub-icon": true,
                                      "transform rotate-180":
                                        subMenu.activeDropdown,
                                    })}
                                  >
                                     <Lucide icon={menu.icon} />
                                  </div>
                                )}
                              </div>
                            </SideMenuTooltip>
                          
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              )
            )}
            {/* END: First Child */}
          </ul>
        </nav>
        {/* END: Side Menu */}
        {/* BEGIN: Content */}
        <div className="content">
          <Outlet />
        </div>
        {/* END: Content */}
      </div>
    </div>
  );
}

export default Main;
