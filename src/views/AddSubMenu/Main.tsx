import React, { useEffect } from "react";
import { useState } from "react";
import * as lucideIcons from "lucide-react";
import { Lucide, Modal, ModalBody } from "@/base-components";

import staticData from "@/stores/staticData";
import MenuLabel from "../../Entity/MenuLabel";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/ApiUrls";
import SubMenu from "../../Entity/SubMenu";
function Main() {
   const [iconNames, setIconNames] = useState<any[]>(["Search"]); // Added type annotation
  const [ValueIcon, setIconMenu] = useState("Disc");
  const [ValueName, setValueName] = useState("");
  const [NameMenulabel, setNameMenulabel] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state?.menuId;
  console.log(menuId)
  const ValidateInput = async () => {
    if (NameMenulabel != "") {
      const menu: SubMenu = {
          id: 1,
          defaultDate: "",
          title: NameMenulabel,
          icon: ValueIcon,
          activeDropdown: undefined,
          active: undefined,
          pathname: ValueName
      };

      try {
         await apiService.AddSubMenu(ApiUrls.POSTSUBMENU+menuId, menu);
          navigate("/dashboard/listmenu")
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
    else{
         setDeleteConfirmationModal(true);
  
    }
  };



    
  useEffect(() => {
    const iconNames = Object.keys(lucideIcons) as string[]; // Added type assertion
    setIconNames(iconNames);
    
  }, []);

  return (
    <>
          <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
          <Lucide
                icon="XCircle"
                className="w-16 h-16 text-danger mx-auto mt-3"
              />
            <div className="text-2xl mt-5"> Please fill the data</div>
   
          </div>
        
   
        </ModalBody>
      </Modal>

      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Sub Menu</h2>
      </div>
      {/* BEGIN: Page Layout */}
      <div className="intro-y box p-5 mt-5">Hello Here You can Add a Sub Menu</div>

      <div className="grid grid-cols-12 gap-6 mt-8" style={{ width: "2380px" }}>
        <div className="intro-y col-span-1 lg:col-span-6">
          {/* BEGIN: Form Layout */}
          <div className="intro-y box p-5">
            <div>
              <div className="mt-3">
                <label htmlFor="regular-form-1" className="form-label">
                  Name of Sub Menu
                </label>
                <input
                  id="regular-form-1"
                  type="text"
                  className="form-control form-control-rounded"
                  placeholder="Name of Menu Label"
                  value={NameMenulabel}
                  onChange={(e) => setNameMenulabel(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-3">
                <label htmlFor="regular-form-1" className="form-label">
                  Page Of Sub Menu
                </label>
                <div></div>
                <select
                    value={ValueName}
                    onChange={(e) => setValueName(e.target.value)} 
                style={{  width:'500px',whiteSpace:'pre-line'}} className="w-20 form-select box mt-3 sm:mt-0">
                
                {staticData.Pages?.map((pages:any, index:any) => (
                        <option key={index} value={pages.value}>
 
                        {pages.value}  
  
                  </option>
                ))}

                </select>
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="regular-form-1" className="form-label">
                Icon
              </label>
              <div></div>
              <select style={{ marginLeft: "20px",width:'500px' }}                 value={ValueIcon}
                onChange={(e) => setIconMenu(e.target.value)} className="w-20 form-select box mt-3 sm:mt-0">
              
                {iconNames?.map((iconName, index) => (
                  <option key={index} value={iconName}>
                    {iconName}
  
                  </option>
                ))}
              </select>
              
            </div>
            <div>
            <Lucide icon={ValueIcon}></Lucide>

            </div>
          </div>
        </div>
        <button onClick={ValidateInput} className="btn btn-outline-success w-24 inline-block mr-1 mb-2">
    Add
</button>
      </div>
    </>
  );
}

export default Main;
