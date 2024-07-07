import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalBody } from "@/base-components"; // Importing Ant Design components
import { Select, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as lucideIcons from "lucide-react"; // Import any necessary icons
import staticData from "@/stores/staticData";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import LocationBin from "../../../Entity/LocationBin";
// import locationBinLabel from "../../../Entity/LoactionBin";

const { Option } = Select;

function Main() {
  const [ValueName, setValueName] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const locationAreaId = location.state?.locationAreaId;

  const [locationBin, setLocationBin] = useState<LocationBin>({
    id: 0,
    Bin: "",
});

  useEffect(() => {
    console.log("from use effect add lcbin", locationAreaId);
  }, []);

  const ValidateInput = async () => {
    console.log(locationAreaId)
    if (locationBin.Bin !== "") {
      try {
        await apiService.AddLocationBin(ApiUrls.LOCATIONBIN, locationAreaId.id, locationBin);
        console.log(locationAreaId)
        navigate("/dashboard/listlocationbin", { state: { locationAreaId }});
      } catch (error) {
        console.error("Error adding locationBin label:", error);
        // Handle error gracefully
      }
    } else {
      setDeleteConfirmationModal(true);
    }
  };

  const handleNameLoactionBinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationBin({...locationBin, [e.target.name] : e.target.value});
    console.log(locationBin)
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
        <h2 className="text-lg font-medium mr-auto">Add locationBin Label</h2>
      </div>

      <div className="intro-y box p-5 mt-5">
        Hello! Here you can add a locationBin Label.
      </div>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
          <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="input-wizard-1" className="form-label">
                LocationBin
              </label>
              <input
                id="input-wizard-1"
                type="text"
                className="form-control"
                placeholder="Name LocationBin"
                name="Bin"
                value={locationBin.Bin}
                onChange={(e) => handleNameLoactionBinChange(e)}
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
