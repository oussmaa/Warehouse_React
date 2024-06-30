import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
 import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import PropTypes, { any } from "prop-types";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Users from "../../Entity/Users";
import React from "react";
 
function Main(props:any) {
  const [UserState, setUserSate] = useState < Users |null>(null);
  const navigate = useNavigate();
  const [searchDropdown, setSearchDropdown] = useState(false);
const navigateprofile = () =>{
navigate("/dashboard/profile")
}
const logout = () =>{
  localStorage.removeItem('token');
  navigate("/")
  }

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const GetUserWithToken = async () => {
    try {
      let token = localStorage.getItem('token');
      const userdata = await apiService.GetUserProfiles(ApiUrls.GETUSERWITHTOKEN,{'token':token});
      setUserSate(userdata);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  
 
  
  useEffect(() => {
    GetUserWithToken();
   }, []);

  return (
    <>
      <style>
        {`
        .before {
          content: "";
          position: absolute;
          height: 65px;
          inset: 0;
           
          margin: 0 7px;
          margin-top: 13px;
          border-radius: 20px;
          display: none;
          background-color:${props.color};
        }

 

        @media (min-width: 768px) {
          .before {
            display: block;
          }

     

          .dark .before {
            background-color: rgba(0, 555550, 66660, 0.3);
          }

       
        
        `}
      </style>
      {/* BEGIN: Top Bar */}
      <div
        className={`${props.className} before top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700`}
      >
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/"
            className="logo -intro-x hidden mb-8 md:flex xl:w-[180px] block"
          >
            <img
              alt="Enigma Tailwind HTML Admin Template"
              className="logo__image w-6"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/640px-NewTux.svg.png"
            />
            <span className="logo__text text-white text-lg ml-3">
              {" "}
              Warehouse System{" "}
            </span>
          </Link>

          <nav
            aria-label="breadcrumb"
            className="-intro-x h-[45px] mr-auto"
          ></nav>

          <div className="intro-x relative mb-8 mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              <Lucide
                icon="Search"
                className="search__icon dark:text-slate-500"
              />
            </div>
            <a className="notification sm:hidden" href="">
              <Lucide
                icon="Search"
                className="notification__icon dark:text-slate-500"
              />
            </a>
            <div
              className={classnames({
                "search-result": true,
                show: searchDropdown,
              })}
            ></div>
          </div>
          {/* END: Search */}
          {/* BEGIN: Notifications */}
          <Dropdown className="intro-x mr-4 mb-8 sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="notification notification--bullet cursor-pointer"
            >
              <Lucide
                icon="Bell"
                className="notification__icon dark:text-slate-500"
              />
            </DropdownToggle>
            <DropdownMenu className="notification-content pt-2">
              <DropdownContent tag="div" className="notification-content__box">
                <div className="notification-content__title">Notifications</div>
                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": fakerKey,
                    })}
                  >
                    <div className="w-12 h-12 flex-none image-fit mr-1">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src=""
                      />
                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <a href="" className="font-medium truncate mr-5">
                          " "
                        </a>
                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                           ""
                        </div>
                      </div>
                      <div className="w-full truncate text-slate-500 mt-0.5">
                        ""
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8 mb-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            >
                <img 
                alt="Midone Tailwind HTML Admin Template"
                src={`http://localhost:7070/login/images/${UserState?.images}`}  
                              className="logo__image w-6"
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{UserState?.username}</div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem onClick={navigateprofile} className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2"  /> Profile
                </DropdownItem>

                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Reset Password
                </DropdownItem>

                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5" onClick={logout}>
                  <Lucide icon="ToggleRight" className="w-4 h-4 mr-2"   /> Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: "",
};

export default Main;
