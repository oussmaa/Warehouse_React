import React, { useEffect } from "react";
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



 



// Define table columns for the new entity
const pikingColumns: TableColumn<Piking>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Status", dataIndex: "status" },
 
  ];
 
// Main component
const Main = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string, pickid: any) => {
     navigate('/dashboard/listpikingposition',{ state: { pickid } });
     
  };
// Fetch function to get goods receipts
const fetchPikings = async (): Promise<Piking[]> => {
  try {
      const response  = await ApiService.GetListOrder(ApiUrls.PICKING);
     return response
   }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

const deletePiking= async (id: number): Promise<void> => {
  try {
   // const response = await ApiService.DeletetSupplier(ApiUrls.SUPPLIER, id);
   } catch (error) {
    console.error('Error deleting supplier:', error);
  }
};

const editPiking = async (shippment: Piking): Promise<void> => {
  try {
    
    //const response = await ApiService.EditSupplier(ApiUrls.SUPPLIER, shippment.id, shippment);
  } catch (error) {
    console.error('Error update supplier:', error);
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
       deleteData={deletePiking}
       editData={editPiking}
       displayBtnTex="display Piking Position"   
        />
    </>
  );
};

export default Main;
