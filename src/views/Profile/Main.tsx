import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@/base-components";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Users from "../../Entity/Users";
import { faker as $f } from "@/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RolesRequest from "../../Entity/RolesRequest";
import Permission from "../../Entity/Permission";

function Main() {

  const [UserState, setUserSate] = useState < Users |null>(null);
  const [userRole, setUserRole] = useState<RolesRequest[] | []>([]);
  const [userpermission, setPermission] = useState<Permission[] | []>([]);

  const navigate = useNavigate();

  const GetUserWithToken = async () => {
    try {
      let token = localStorage.getItem('token');
      const userdata = await apiService.GetUserProfiles(ApiUrls.GETUSERWITHTOKEN,token);
        setUserRole(userdata.roles);
        setPermission(userdata.permissions)
        console.log(userpermission)
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
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Profile Layout</h2>
      </div>
      <TabGroup>
        {/* BEGIN: Profile Info */}
        <div className="intro-y box px-5 pt-5 mt-5">
          <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
            <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  style={{width:'400px'}}
                  src={`http://localhost:7070/login/images/${UserState?.images}`} 
                />
              </div>
              <div className="ml-5">
                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  {UserState?.name}
                </div>
                <div className="text-slate-500"> {UserState?.username}</div>
              </div>
              <div className="ml-5">
                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                   role  
               </div>
               {
                
                userRole?.map((rl)=>{
                  return <div className="text-slate-500"> {rl.roles}</div>
                })
               }
                {/* <div className="text-slate-500"> {userRole?.roles}</div> */}
              </div>
              <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
            Permission   
               </div>
               {
    userpermission?.map((rl, index) => {
        return (
            <div key={index} className="text-slate-500" style={{ marginBottom: '10px' }}>
                 <p>   {rl.code}</p>
            </div>
        );
    })
}


            </div>
            <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Contact Details
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                <div className="truncate sm:whitespace-normal flex items-center">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {UserState?.email}
                </div>
                <div className="truncate sm:whitespace-normal flex items-center mt-3">
                  <Lucide icon="Instagram" className="w-4 h-4 mr-2" />  
                  {UserState?.phone}
                </div>
              </div>
            </div>
 
          </div>
          <TabList className="nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center">
            <Tab fullWidth={false} className="py-4 cursor-pointer">
              Account & Profile
            </Tab>
            <Tab fullWidth={false} className="py-4 cursor-pointer">
              Activities
            </Tab>
            <Tab fullWidth={false} className="py-4 cursor-pointer">
              Tasks
            </Tab>
          </TabList>
        </div>
        {/* END: Profile Info */}
  
      </TabGroup>
    </>
  );
}

export default Main;
