import React, { useState } from "react";
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
import { Alert } from "@/base-components";



 

// Define table columns for the new entity
const ordersColumns: TableColumn<any>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
  { title: "Type", dataIndex: "type" },
  { title: "Status", dataIndex: "status" },

];

// Main component
const Main = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (path: string, orderId: any
  ) => {
 
    navigate('/dashboard/listorderpositions',{ state: { orderId } });
     
  };

  
const fetchOrder = async (): Promise<any[]> => {
  try {
     const response  = await ApiService.GetListOrder(ApiUrls.GetALLORDER);
     return response
     
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};
  
// generate 
const navigateToGenerate = async (path : string, orderId : any) =>{
    
   try {
     await ApiService.GenratePicking(ApiUrls.GENRATEPICKING+orderId.id);
    navigate('/dashboard/listpiking');
 }catch(err:any){
  setAlertMessage(err.response.data);
  setShowAlert(true);
  setTimeout(() => {
      setShowAlert(false);
  }, 3000); // 3-second delay

    throw err;
 }


}
 
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Orders</h1>
      </div>
      <Alert
                        show={showAlert}
                        className="alert-danger"
                        onHidden={() => setShowAlert(false)}
                    >
                        {alertMessage}
                    </Alert>
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
