import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import TableColumn from "../../../Entity/TableColumn"; // Assuming TableColumn is reused for OrderStock
 

interface OrderStock {
    id: number;
    orderStockNb: number;
    description: string;
    quantityNeeded: number;
    supplier: string; // Assuming supplier is represented as a string for simplicity
  }


const orderStockColumns: TableColumn<OrderStock>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Order Stock Number", dataIndex: "orderStockNb" },
  { title: "Description", dataIndex: "description" },
  { title: "Quantity Needed", dataIndex: "quantityNeeded" },
  { title: "Supplier", dataIndex: "supplier" },
];

const fetchOrderStocks = async (): Promise<OrderStock[]> => {
  // Replace this with your actual fetch logic
  return [
    {
      id: 1,
      orderStockNb: 1001,
      description: "Order Stock 1 Description",
      quantityNeeded: 10,
      supplier: "Supplier A",
    },
    {
      id: 2,
      orderStockNb: 1002,
      description: "Order Stock 2 Description",
      quantityNeeded: 15,
      supplier: "Supplier B",
    },
    // Add more data as needed
  ];
};

const deleteOrderStock = async (id: number): Promise<void> => {
  console.log("Deleting Order Stock with ID:", id);
  // Implement your delete logic here
};

const editOrderStock = async (orderStock: OrderStock): Promise<void> => {
  console.log("Editing Order Stock:", orderStock);
  // Implement your edit logic here
};

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Order Stocks</h1>
      </div>
      <Table<OrderStock>
        columns={orderStockColumns}
        fetchData={fetchOrderStocks}
        deleteData={deleteOrderStock}
        editData={editOrderStock}
      />
    </>
  );
};

export default Main;
