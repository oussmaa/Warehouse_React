import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import Supplier from "../../../Entity/Supplier";
import TableColumn from "../../../Entity/TableColumn";
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";
import Customer from "../../../Entity/Customer";

const supplierColumns: TableColumn<Customer>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Address", dataIndex: "address" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
  { title: "City", dataIndex: "city" },
  { title: "State", dataIndex: "state" },
  { title: "ZIP", dataIndex: "zip" },
  { title: "Country", dataIndex: "country" },
  { title: "Purchase Cost", dataIndex: "allCost" },

];

const fetchSuppliers = async (): Promise<Customer[]> => {
   // Mock data, replace with actual API call logic
   try {
    const response  = await ApiService.GetListCustomer(ApiUrls.GetLISTCustomer);
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

const deleteSupplier = async (id: number): Promise<void> => {
  try {
    const response = await ApiService.DeletetSupplier(ApiUrls.SUPPLIER, id);
    console.log('supplier deleted:', response);
  } catch (error) {
    console.error('Error deleting supplier:', error);
  }
};

const editSupplier = async (supplier: Supplier): Promise<void> => {
  try {
    console.log(supplier)
    const response = await ApiService.EditSupplier(ApiUrls.SUPPLIER, supplier.id, supplier);
  } catch (error) {
    console.error('Error update supplier:', error);
  }
  console.log("Edit supplier:", supplier);
};

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Customer </h1>
      </div>
      <Table<Customer>
        columns={supplierColumns}
        fetchData={fetchSuppliers}
        deleteData={deleteSupplier}
        editData={editSupplier}
      />
    </>
  );
};

export default Main;