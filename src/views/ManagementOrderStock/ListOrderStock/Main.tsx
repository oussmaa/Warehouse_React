import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import TableColumn from "../../../Entity/TableColumn"; // Assuming TableColumn is reused for OrderStock
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";
import OrderStock from "../../../Entity/OrderStock";
 

// interface OrderStock {
//     id: number;
//     orderStockNb: number;
//     description: string;
//     quantityNeeded: number;
//     supplier: string; // Assuming supplier is represented as a string for simplicity
//   }


const orderStockColumns: TableColumn<OrderStock>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Order Stock Number", dataIndex: "orderStockNb" },
  { title: "Description", dataIndex: "description" },
  { title: "Quantity Needed", dataIndex: "quantityNeeded" },
  { title: "Supplier", dataIndex: "supplier" },
];

const fetchOrderStocks = async (): Promise<OrderStock[]> => {
  try {
    const response  = await ApiService.GetListOrderStock(ApiUrls.ORDERSTOCK);
    console.log("order stc : " + JSON.stringify(response));
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
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
