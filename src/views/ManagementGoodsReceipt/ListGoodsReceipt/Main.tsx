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

// Define table columns for the new entity
const goodsReceiptColumns: TableColumn<GoodsReceipt>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Description", dataIndex: "description" },
   { title: "Order Stockid", dataIndex: "orderStockId" },
];

// Main component
const Main = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string, menuId: any) => {
 
    navigate('/dashboard/listgoodsreceiptpos',{ state: { menuId } });
     
  };
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
 
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Goods Receipts</h1>
      </div>
      <TableUpdateMenu<GoodsReceipt>
       columns={goodsReceiptColumns}
       fetchData={fetchGoodsReceipts}
       deleteData={deleteGoodsReceipt}
      editData={editGoodsReceipt} 
      navigateTo={handleNavigate}             
                   
        />
    </>
  );
};

export default Main;
