import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table"; // Ensure this path is correct
import { GoodsReceipt } from "../../../Entity/GoodsReceipt"; // Adjust path as necessary
import TableColumn from "../../../Entity/TableColumn"; // Adjust path as necessary
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";
import TableUpdateMenu from "../../../base-components/Table/TableUpdateMenu";
import { useNavigate } from "react-router-dom";
import Order from "../../../Entity/Order";




//----static data 
const orders: Order[] = [
    {
      id: 1,
      articel: "Laptop",
      quantity: 10,
      description: "Order for high-end laptops",
      status: "Pending",
      goPinkinng: true,
      locationArea: "A1",
      locationBin: "B2",
      locationPlace: "P3"
    },
    {
      id: 2,
      articel: "Smartphone",
      quantity: 50,
      description: "Order for new smartphones",
      status: "Processing",
      goPinkinng: false,
      locationArea: "A2",
      locationBin: "B1",
      locationPlace: "P4"
    },
    {
      id: 3,
      articel: "Printer",
      quantity: 5,
      description: "Order for office printers",
      status: "Completed",
      goPinkinng: true,
      locationArea: "A3",
      locationBin: "B3",
      locationPlace: "P1"
    },
    {
      id: 4,
      articel: "Monitor",
      quantity: 20,
      description: "Order for computer monitors",
      status: "Pending",
      goPinkinng: false,
      locationArea: "A4",
      locationBin: "B4",
      locationPlace: "P2"
    },
    {
      id: 5,
      articel: "Keyboard",
      quantity: 30,
      description: "Order for mechanical keyboards",
      status: "Processing",
      goPinkinng: true,
      locationArea: "A5",
      locationBin: "B5",
      locationPlace: "P5"
    }
  ];

// Define table columns for the new entity
const ordersColumns: TableColumn<any>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
  { title: "Type", dataIndex: "type" },
];

// Main component
const Main = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string, orderId: any
  ) => {
 console.log(orderId)
    navigate('/dashboard/listorderpositions',{ state: { orderId } });
     
  };

  
const fetchOrder = async (): Promise<any[]> => {
  try {
     const response  = await ApiService.GetListOrder(ApiUrls.GetALLORDER);
     return response
    return orders;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

// generate 
const navigateToGenerate = (path : string, orderId : any) =>{
    navigate("/dashboard/generate",{ state: { orderId } });
}
 
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Orders</h1>
      </div>
      <Table<Order>
       columns={ordersColumns}
       fetchData={fetchOrder}
      navigateTo={handleNavigate}
      displayBtnTex="display Order position"   
      generate={navigateToGenerate}          
                   
        /> 
    </>
  );
};

export default Main;
