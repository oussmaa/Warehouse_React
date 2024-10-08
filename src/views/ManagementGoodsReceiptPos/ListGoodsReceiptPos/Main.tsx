import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import GoodsReceiptPos from "../../../Entity/GoodsReceiptPos"; // Adjust import
import TableColumn from "../../../Entity/TableColumn"; // Adjust import
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";
import { useNavigate, useLocation } from "react-router-dom";

const goodsReceiptColumns: TableColumn<GoodsReceiptPos>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Quantity Booked", dataIndex: "quantityBooked" },
  { title: "Description", dataIndex: "description" },
  { title: "Article ", dataIndex: "article" },
  { title: "Location Area ", dataIndex: "location_area" },
  { title: "Location Bin ", dataIndex: "location_bin" },
  { title: "Location Place ", dataIndex: "location_place" },
];



const deleteGoodsReceiptPos = async (id: number): Promise<void> => {
  try {
    const response = await ApiService.DeletetGoodsReceiptPos(ApiUrls.GOODSRECEIPTPOS, id);
    console.log('GoodsReceiptPos deleted:', response);
  } catch (error) {
    console.error('Error deleting GoodsReceiptPos:', error);
  }
};

const editGoodsReceiptPos = async (goodsReceiptPos: GoodsReceiptPos): Promise<void> => {
  try {
    const response = await ApiService.EditGoodsReceiptPos(ApiUrls.GOODSRECEIPTPOS, goodsReceiptPos.id, goodsReceiptPos);
  } catch (error) {
    console.error('Error update goodsReceiptPos:', error);
  }
  console.log("Edit goodsReceiptPos:", goodsReceiptPos);
};

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const idgoods = location.state?.menuId.menuId;

  const fetchGoodsReceiptPos = async (): Promise<GoodsReceiptPos[]> => {
    try {
      const response  = await ApiService.GetListGoodsReceiptPos(ApiUrls.GOODSRECEIPTPOS+'/'+idgoods);
      return response;
    }catch(err){
      console.log("Error fetching data" + err);
      throw err;
    }
  };
  const navigatetadpos = () => {
 
    navigate('/dashboard/addgoodsreceiptpos',{ state: { idgoods } });
     
  };
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Goods Receipt Positions</h1>
        <Button type="default"  onClick={() => navigatetadpos()} >
            Add New Position
          </Button> 
      </div>
      <Table<GoodsReceiptPos>
        columns={goodsReceiptColumns}
        fetchData={fetchGoodsReceiptPos}
        deleteData={deleteGoodsReceiptPos}
        editData={editGoodsReceiptPos}
      />
    </>
  );
};

export default Main;
