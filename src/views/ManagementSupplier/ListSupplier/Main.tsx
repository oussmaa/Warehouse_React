import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import Supplier from "../../../Entity/Supplier";
import TableColumn from "../../../Entity/TableColumn";
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";

const supplierColumns: TableColumn<Supplier>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Address", dataIndex: "address" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
  { title: "City", dataIndex: "city" },
  { title: "State", dataIndex: "state" },
  { title: "ZIP", dataIndex: "zip" },
  { title: "Country", dataIndex: "country" },
];

const fetchSuppliers = async (): Promise<Supplier[]> => {
   // Mock data, replace with actual API call logic
   try {
    const response  = await ApiService.GetListSupplier(ApiUrls.SUPPLIER);
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
        <h1 className="text-2xl font-bold mb-4">List Of Supplier </h1>
      </div>
      <Table<Supplier>
        columns={supplierColumns}
        fetchData={fetchSuppliers}
        deleteData={deleteSupplier}
        editData={editSupplier}
      />
    </>
  );
};

export default Main;
