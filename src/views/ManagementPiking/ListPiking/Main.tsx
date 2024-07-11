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
import Piking from "../../../Entity/Piking";




//----static data 
const pikingData: Piking[] = [
    {
      id: 1,
      name: "Picking Item 1",
      description: "First picking item",
      status: "Pending",
      order: "Order001",
      locationArea: "Area A",
      locationBin: "Bin A1",
      locationPlace: "Place A1-1",
    },
    {
      id: 2,
      name: "Picking Item 2",
      description: "Second picking item",
      status: "Completed",
      order: "Order002",
      locationArea: "Area B",
      locationBin: "Bin B1",
      locationPlace: "Place B1-1",
    },
    {
      id: 3,
      name: "Picking Item 3",
      description: "Third picking item",
      status: "In Progress",
      order: "Order003",
      locationArea: "Area C",
      locationBin: "Bin C1",
      locationPlace: "Place C1-1",
    },
    {
      id: 4,
      name: "Picking Item 4",
      description: "Fourth picking item",
      status: "Pending",
      order: "Order004",
      locationArea: "Area D",
      locationBin: "Bin D1",
      locationPlace: "Place D1-1",
    },
    {
      id: 5,
      name: "Picking Item 5",
      description: "Fifth picking item",
      status: "Completed",
      order: "Order005",
      locationArea: "Area E",
      locationBin: "Bin E1",
      locationPlace: "Place E1-1",
    },
    {
      id: 6,
      name: "Picking Item 6",
      description: "Sixth picking item",
      status: "In Progress",
      order: "Order006",
      locationArea: "Area F",
      locationBin: "Bin F1",
      locationPlace: "Place F1-1",
    },
    {
      id: 7,
      name: "Picking Item 7",
      description: "Seventh picking item",
      status: "Pending",
      order: "Order007",
      locationArea: "Area G",
      locationBin: "Bin G1",
      locationPlace: "Place G1-1",
    },
    {
      id: 8,
      name: "Picking Item 8",
      description: "Eighth picking item",
      status: "Completed",
      order: "Order008",
      locationArea: "Area H",
      locationBin: "Bin H1",
      locationPlace: "Place H1-1",
    },
    {
      id: 9,
      name: "Picking Item 9",
      description: "Ninth picking item",
      status: "In Progress",
      order: "Order009",
      locationArea: "Area I",
      locationBin: "Bin I1",
      locationPlace: "Place I1-1",
    },
    {
      id: 10,
      name: "Picking Item 10",
      description: "Tenth picking item",
      status: "Pending",
      order: "Order010",
      locationArea: "Area J",
      locationBin: "Bin J1",
      locationPlace: "Place J1-1",
    }
  ];



// Define table columns for the new entity
const pikingColumns: TableColumn<Piking>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Status", dataIndex: "status" },
    { title: "Order", dataIndex: "order" },
    { title: "LocationArea", dataIndex: "locationArea" },
    { title: "LocationBin", dataIndex: "locationBin" },
    { title: "LocationPlace", dataIndex: "locationPlace" },
  ];
 
// Main component
const Main = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string, menuId: any) => {
 
    navigate('/dashboard/listgoodsreceiptpos',{ state: { menuId } });
     
  };
// Fetch function to get goods receipts
const fetchPikings = async (): Promise<Piking[]> => {
  try {
    // const response  = await ApiService.GetListOrder(ApiUrls.ORDER);
    //return response
    return pikingData;
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
        <h1 className="text-2xl font-bold mb-4">List Pinkings</h1>
      </div>
      <Table<Piking>
       columns={pikingColumns}
       fetchData={fetchPikings}
       navigateTo={handleNavigate}
       displayBtnTex="display Piking Position"   
        />
    </>
  );
};

export default Main;
