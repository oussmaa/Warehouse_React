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



//---- Fake interface to test
interface Order {
    id: number,
    ref : string,
    description : string
}

//----static data 
const orders: Order[] = [
    {
      id: 1,
      ref: "ORD001",
      description: "Order for electronic components",
    },
    {
      id: 2,
      ref: "ORD002",
      description: "Order for office supplies",
    },
    {
      id : 3,
      ref: "ORD003",
      description: "Order for kitchen appliances",
    },
    {
      id: 4,
      ref: "ORD004",
      description: "Order for books and stationery",
    },
    {
      id: 5,
      ref: "ORD005",
      description: "Order for computer accessories",
    },
  ];



// Define table columns for the new entity
const ordersColumns: TableColumn<Order>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
  { title: "Order Reference", dataIndex: "ref" },
];

// Main component
const Main = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string, menuId: any) => {
 
    navigate('/dashboard/listgoodsreceiptpos',{ state: { menuId } });
     
  };
// Fetch function to get goods receipts
const fetchOrder = async (): Promise<Order[]> => {
  try {
    // const response  = await ApiService.GetListOrder(ApiUrls.ORDER);
    //return response
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
