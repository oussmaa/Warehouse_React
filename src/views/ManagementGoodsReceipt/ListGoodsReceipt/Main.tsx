import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table"; // Ensure this path is correct
import { GoodsReceipt } from "../../../Entity/GoodsReceipt"; // Adjust path as necessary
import TableColumn from "../../../Entity/TableColumn"; // Adjust path as necessary

// Define table columns for the new entity
const goodsReceiptColumns: TableColumn<GoodsReceipt>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
  { title: "Goods Receipt Posid", dataIndex: "goodsReceiptPosid" },
  { title: "Order Stockid", dataIndex: "orderStockid" },
];

// Fetch function to get goods receipts
const fetchGoodsReceipts = async (): Promise<GoodsReceipt[]> => {
  // Mock data for demonstration
  return [
    {
      id: 1,
      description: "Goods Receipt 1",
      goodsReceiptPosid: 123,
      orderStockid: 456,
    },
    // Add more goods receipt objects as needed
  ];
};

// Function to delete a goods receipt
const deleteGoodsReceipt = async (id: number): Promise<void> => {
  console.log("Delete goods receipt with ID:", id);
  // Implement your deletion logic here
};

// Function to edit a goods receipt
const editGoodsReceipt = async (goodsReceipt: GoodsReceipt): Promise<void> => {
  console.log("Edit goods receipt:", goodsReceipt);
  // Implement your edit logic here
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
