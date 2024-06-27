import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
 import TableColumn from "../../../Entity/TableColumn"; // Adjust path as necessary
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";
import Globalestock from "../../../Entity/Globalestock";

// interface Globalestock {
//     id: number; // Optional for new entries
//     quantityUsed: number;
//     article: string;
//     openingQuantity: number;
//   }
// Define table columns for the new entity
const globalestockColumns: TableColumn<Globalestock>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Quantity Used", dataIndex: "quantityUsed" },
  { title: "Article", dataIndex: "articleId"}, // Assuming 'article' has a 'name' property
  { title: "Opening Quantity", dataIndex: "openingQuantity" },
];



// Main component
const Main = () => {



  // Fetch function to get globalestocks
const fetchGlobalestocks = async (): Promise<Globalestock[]> => {
  // Mock data, replace with actual API call logic
  try {
    const response  = await ApiService.GetListGlobalStock(ApiUrls.GLOBALSTOCK);
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
  // const response : Globalestock[]= [];
  // return response;
};

// Function to delete a globalestock
const deleteGlobalestock = async (id: number): Promise<void> => {
  try {
    const response = await ApiService.DeletetGlobalStock(ApiUrls.GLOBALSTOCK, id);
    console.log('globalestock deleted:', response);
  } catch (error) {
    console.error('Error deleting globalestock:', error);
  }
};

// Function to edit a globalestock
const editGlobalestock = async (globalestock: Globalestock): Promise<void> => {
  try {
    const response = await ApiService.EditGlobalStock(ApiUrls.GLOBALSTOCK, globalestock.id, globalestock);
  } catch (error) {
    console.error('Error update globalestock:', error);
  }
  console.log("Edit globalestock:", globalestock);
  // Implement your edit logic here
};
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Globalestocks</h1>
      </div>
      <Table<Globalestock>
        columns={globalestockColumns}
        fetchData={fetchGlobalestocks}
        deleteData={deleteGlobalestock}
        editData={editGlobalestock}
      />
    </>
  );
};

export default Main;
