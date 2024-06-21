import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "@/base-components"; // Importing Ant Design components
import { Select, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as lucideIcons from "lucide-react"; // Import any necessary icons
import staticData from "@/stores/staticData";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import MenuLabel from "../../../Entity/MenuLabel";

const { Option } = Select;

function Main() {
  const [ValueName, setValueName] = useState("");
  const [NameMenulabel, setNameMenulabel] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state?.menuId;

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const ValidateInput = async () => {
    if (NameMenulabel !== "" && ValueName !== "") {
      const menu = {
        id: "",
        defaultDate: "",
        subMenus: [],
        title: NameMenulabel,
        icon: "ValueIcon", // Replace with appropriate icon logic
        activeDropdown: undefined,
        active: undefined,
        pathname: ValueName,
      };

      try {
        await apiService.AddMenuLabel(ApiUrls.POSTMENULABEL + menuId, menu);
        navigate("/dashboard/listmenu");
      } catch (error) {
        console.error("Error adding menu label:", error);
        // Handle error gracefully
      }
    } else {
      setDeleteConfirmationModal(true);
    }
  };

  const handleNameMenuLabelChange = (value:any) => {
    const selectedPage = staticData.Pages.find((page:any) => page.value === value);

    if (selectedPage) {
      setNameMenulabel(selectedPage.name);
      setValueName(selectedPage.value);
    } else {
      setNameMenulabel("");
      setValueName("");
    }
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
        <h2 className="text-lg font-medium mr-auto">Add Menu Label</h2>
      </div>

      <div className="intro-y box p-5 mt-5">
        Hello! Here you can add a Menu Label.
      </div>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div className="mt-3">
              <label htmlFor="select-menu-label" className="form-label">
                Name of Menu Label
              </label>
              <Select
                id="select-menu-label"
                placeholder="Select a menu label"
                style={{ width: "100%" }}
                onChange={handleNameMenuLabelChange}
                value={NameMenulabel}
              >
                {staticData.Pages?.map((page:any) => (
                  <Option key={page.value} value={page.value}>
                    {page.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mt-3">
              <label htmlFor="input-page-label" className="form-label">
                Page Of Menu Label
              </label>
              <Input
                id="input-page-label"
                type="text"
                className="form-control form-control-rounded"
                placeholder="Page Of Menu Label"
                value={ValueName}
                disabled
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
