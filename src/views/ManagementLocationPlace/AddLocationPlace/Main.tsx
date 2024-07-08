import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalBody } from "@/base-components"; // Importing Ant Design components
import { Select, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as lucideIcons from "lucide-react"; // Import any necessary icons
import staticData from "@/stores/staticData";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import LocationPlace from "../../../Entity/LocationPlace";
// import locationPlaceLabel from "../../../Entity/LoactionPlace";

const { Option } = Select;

function Main() {
  const [ValueName, setValueName] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationBinId = location.state?.locationBinId;

  const [locationPlace, setLocationPlace] = useState<LocationPlace>({
    id: 0,
    Place: "",
});

  useEffect(() => {
    console.log("from use effect add lcPlace", locationBinId);
  }, []);

  const ValidateInput = async () => {
    console.log(locationBinId)
    if (locationPlace.Place !== "") {
      try {
        await apiService.AddLocationPlace(ApiUrls.LOCATIONPLACE, locationBinId.id, locationPlace);
        console.log(locationBinId)
        navigate("/dashboard/listlocationPlace", { state: { locationBinId }});
      } catch (error) {
        console.error("Error adding locationPlace label:", error);
        // Handle error gracefully
      }
    } else {
      setDeleteConfirmationModal(true);
    }
  };

  const handleNameLoactionPlaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationPlace({...locationPlace, [e.target.name] : e.target.value});
    console.log(locationPlace)
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
        <h2 className="text-lg font-medium mr-auto">Add locationPlace Label</h2>
      </div>

      <div className="intro-y box p-5 mt-5">
        Hello! Here you can add a locationPlace Label.
      </div>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
          <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="input-wizard-1" className="form-label">
                LocationPlace
              </label>
              <input
                id="input-wizard-1"
                type="text"
                className="form-control"
                placeholder="Name LocationPlace"
                name="Place"
                value={locationPlace.Place}
                onChange={(e) => handleNameLoactionPlaceChange(e)}
              />
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
