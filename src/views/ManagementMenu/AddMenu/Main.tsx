import React, { useState } from "react";
 import SubMenu from "@/views/SubMenu/Main";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls"
import { useNavigate } from "react-router-dom";
 import { Lucide, Modal, ModalBody } from "@/base-components";
import Menu from "../../../Entity/Menu";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [NameMenu, setNameMenu] = useState("");
  const [ColorMenu, setColorMenu] = useState("#89CFF0");
  const navigate = useNavigate();

  const ValidateInput = async () => {
    if (NameMenu != "") {
      const menu: Menu = {
        id: 0,
        defaultDate: "",
        menuLabels: [],
        nameMenu: NameMenu,
        colorMenu: ColorMenu,
      };

      try {
        console.log(menu);
        await apiService.AddMenu(ApiUrls.POSTMENU, menu);
        navigate("/dashboard/listmenu")
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
    else{
         setDeleteConfirmationModal(true);
  
    }
  };

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
          
            <div className="text-2xl mt-5"> Please fill the data</div>
   
          </div>
        
   
        </ModalBody>
      </Modal>

      <div className="flex items-center mt-8">
        <h2 className="intro-y text-lg font-medium mr-auto">Menu Page</h2>
      </div>
      {/* BEGIN: Wizard Layout */}
      <div className="intro-y box py-10 sm:py-20 mt-5">
        <div className="px-5 mt-10">
          <div className="font-medium text-center text-lg">Setup Your Menu</div>
        </div>
        <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
            <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="input-wizard-1" className="form-label">
                Name Menu
              </label>
              <input
                id="input-wizard-1"
                type="text"
                className="form-control"
                placeholder="Name Menu"
                value={NameMenu}
                onChange={(e) => setNameMenu(e.target.value)}
              />
            </div>
            <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="input-wizard-2" className="form-label">
                Color Menu
              </label>
              <input
                id="input-wizard-2"
                type="color"
                className="form-control"
                placeholder="Color Menu"
                value={ColorMenu}
                onChange={(e) => setColorMenu(e.target.value)}
              />
            </div>
          </div>

          <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
            <button
              onClick={ValidateInput}
              className="btn btn-primary w-24 ml-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* END: Wizard Layout */}
    </>
  );
}
export default Main;
