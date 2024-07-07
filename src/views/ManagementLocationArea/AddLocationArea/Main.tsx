import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalBody } from "@/base-components"; // Importing Ant Design components
import { Select, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as lucideIcons from "lucide-react"; // Import any necessary icons
import staticData from "@/stores/staticData";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import MenuLabel from "../../../Entity/MenuLabel";
import LocationArea from "../../../Entity/LocationArea";

const { Option } = Select;

function Main() {
  
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

//   const menuId = location.state?.menuId;

const [locationArea, setLocationArea] = useState<LocationArea>({
                                                    id: 0,
                                                    area: "",
                                                });


  


  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const ValidateInput = async () => {
    if (locationArea.area !== "") {

      try {
        await apiService.AddLocationArea(ApiUrls.LOCATIONAREA, locationArea);
        // navigate("/dashboard/listmenu");
        console.log("location added")
      } catch (error) {
        console.error("Error adding menu label:", error);
        // Handle error gracefully
      }
    } else {
      setDeleteConfirmationModal(true);
    }
  };

  const handleLocationAreaChange = (e: ChangeEvent<HTMLInputElement>) => {

      setLocationArea({...locationArea, [e.target.name] : e.target.value});
      console.log(locationArea)

  };

  return (
    <>
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => setDeleteConfirmationModal(false)}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <div className="text-2xl mt-5">Please fill all fields</div>
          </div>
        </ModalBody>
      </Modal>

      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Location Area</h2>
      </div>

      <div className="intro-y box p-5 mt-5">
        Hello! Here you can add a Area.
      </div>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div className="mt-3">
              <label htmlFor="select-menu-label" className="form-label">
                Name of Area
              </label>
              <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="input-wizard-1" className="form-label">
                Area
              </label>
              <input
                id="input-wizard-1"
                type="text"
                className="form-control"
                placeholder="Name Area"
                name="area"
                value={locationArea.area}
                onChange={(e) => handleLocationAreaChange(e)}
              />
            </div>
            </div>
          </div>
        </div>

        <div className="intro-y col-span-12 lg:col-span-6 flex justify-end items-end">
          <Button onClick={ValidateInput} className="w-24">
            Add
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
