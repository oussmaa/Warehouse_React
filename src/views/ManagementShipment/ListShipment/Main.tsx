import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import Supplier from "../../../Entity/Supplier";
import TableColumn from "../../../Entity/TableColumn";
import ApiService from "../../../Service/ApiService";
 import shippment from "../../../Entity/Shippment";
import ApiUrls from "../../../API/apiUrls";

const ShipmmentColumns: TableColumn<shippment>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "receiptDate", dataIndex: "receiptDate" },
  { title: "receiptTime", dataIndex: "receiptTime" },
  { title: "receiptAddress", dataIndex: "receiptAddress" },
  { title: "receiptCity", dataIndex: "receiptState" },
  { title: "receiptZip", dataIndex: "receiptCountry" },
  { title: "receiptPhone", dataIndex: "receiptPhone" },
  { title: "receiptEmail", dataIndex: "receiptEmail" },
  { title: "receiptName", dataIndex: "receiptName" },
];

const fetchShippment = async (): Promise<shippment[]> => {
   // Mock data, replace with actual API call logic
   try {
    const response  = await ApiService.GetListShippment(ApiUrls.GetListShippment);
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

 const deleteShippment= async (id: number): Promise<void> => {
  try {
   // const response = await ApiService.DeletetSupplier(ApiUrls.SUPPLIER, id);
   } catch (error) {
    console.error('Error deleting supplier:', error);
  }
};

const editShippment = async (shippment: shippment): Promise<void> => {
  try {
    
    //const response = await ApiService.EditSupplier(ApiUrls.SUPPLIER, shippment.id, shippment);
  } catch (error) {
    console.error('Error update supplier:', error);
  }
 }; 

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Shippment </h1>
      </div>
      <Table<shippment>
        columns={ShipmmentColumns}
        fetchData={fetchShippment}
        deleteData={deleteShippment}
        editData={editShippment}
      />
    </>
  );
};

export default Main;
