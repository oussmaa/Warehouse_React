import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalBody } from "@/base-components";
import { Select, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as lucideIcons from "lucide-react";
import staticData from "@/stores/staticData";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import MenuLabel from "../../../Entity/MenuLabel";
import { Alert } from "@/base-components";
import LocationArea from "../../../Entity/LocationArea";
import Customer from "../../../Entity/Customer";
import ApiService from "../../../Service/ApiService";

function Main() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [idcustomer, setIdcustomer] = useState("");
  const [order, setOrder] = useState<any>({
    id: 0,
    description: "",
    type: "",
    idcustomer: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await ApiService.GetListCustomer(ApiUrls.GetLISTCustomer);
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setAlertMessage("Error fetching customers");
        setShowAlert(true);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      idcustomer: idcustomer,
    }));
  }, [idcustomer]);

  const validateInput = async () => {
    if (order.description !== "" && order.type !== "" && idcustomer) {
      try {
         const res = await apiService.AddOrder(ApiUrls.AddOrder, order);
         navigate("/dashboard/listorder");
       } catch (error) {
        console.error("Error adding order:", error);
      }
    } else {
      setDeleteConfirmationModal(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={deleteConfirmationModal} onHidden={() => setDeleteConfirmationModal(false)}>
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <div className="text-2xl mt-5">Please fill all fields</div>
          </div>
        </ModalBody>
      </Modal>
      <Alert show={showAlert} className="alert-danger" onHidden={() => setShowAlert(false)}>
        {alertMessage}
      </Alert>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Order</h2>
      </div>

      <div className="intro-y box p-5 mt-5">
        Hello! Here you can add an Order.
      </div>

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div className="mt-3">
              <label htmlFor="input-description" className="form-label">Description</label>
              <Input
                id="input-description"
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={order.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="input-type" className="form-label">Type</label>
              <Input
                id="input-type"
                type="text"
                className="form-control"
                placeholder="Type"
                name="type"
                value={order.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="idcustomer" className="block text-sm font-medium leading-6 text-gray-900">
                Customer
              </label>
              <div className="mt-2">
                <select
                  value={idcustomer}
                  onChange={(e) => setIdcustomer(e.target.value)}
                  id="idcustomer"
                  name="idcustomer"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="intro-y col-span-12 lg:col-span-6 flex justify-end items-end">
          <Button onClick={validateInput} className="w-24">
            Add
          </Button>
        </div>
      </div>
    </>
  );
}

export default Main;
