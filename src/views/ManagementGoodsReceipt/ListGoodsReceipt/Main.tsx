import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table"; // Ensure this path is correct
import { GoodsReceipt } from "../../../Entity/GoodsReceipt"; // Adjust path as necessary
import TableColumn from "../../../Entity/TableColumn"; // Adjust path as necessary
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";

// Define table columns for the new entity
const goodsReceiptColumns: TableColumn<GoodsReceipt>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
  { title: "Goods Receipt Posid", dataIndex: "goodsReceiptPosid" },
  { title: "Order Stockid", dataIndex: "orderStockid" },
];

// Fetch function to get goods receipts
const fetchGoodsReceipts = async (): Promise<GoodsReceipt[]> => {
  try {
    const response  = await ApiService.GetListGoodsReceipt(ApiUrls.GOODSRECEIPT);
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

// Function to delete a goods receipt
const deleteGoodsReceipt = async (id: number): Promise<void> => {
  try {
    const response = await ApiService.DeletetGoodsReceipt(ApiUrls.GOODSRECEIPT, id);
    console.log('GoodsReceipt deleted:', response);
  } catch (error) {
    console.error('Error deleting GoodsReceipt:', error);
  }
};

// Function to edit a goods receipt
const editGoodsReceipt = async (goodsReceipt: GoodsReceipt): Promise<void> => {
  try {
    const response = await ApiService.EditGoodsReceipt(ApiUrls.GOODSRECEIPT, goodsReceipt.id, goodsReceipt);
  } catch (error) {
    console.error('Error update goodsReceipt:', error);
  }
  console.log("Edit goodsReceipt:", goodsReceipt);
};

// Main component
const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Goods Receipts</h1>
      </div>
      <Table<GoodsReceipt>
        columns={goodsReceiptColumns}
        fetchData={fetchGoodsReceipts}
        deleteData={deleteGoodsReceipt}
        editData={editGoodsReceipt}
      />
    </>
  );
};

export default Main;
