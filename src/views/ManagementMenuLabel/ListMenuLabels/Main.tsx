import {
  Lucide,
  Modal,
  ModalBody,
} from "@/base-components";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import React from "react";
import apiService from '@/Service/ApiService';
import ApiUrls from "@/API/apiUrls"
import TableColumn from "../../../Entity/TableColumn";
import TableUpdateMenu from "../../../base-components/Table/TableUpdateMenu";
import { Button } from "antd";
   
interface MenuLabel {
  id:number;
  title: string;
  pathname: string;
  defaultDate: string; // Assuming defaultDate is a string
 
}
const menuColumns: TableColumn<MenuLabel>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "title" },
  { title: "Path Name", dataIndex: "pathname" },
  { title: "Date Creation", dataIndex: "defaultDate" },
 
];



function Main() {
  const [menulabel, setmenulabel] = useState<MenuLabel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state?.menuId.menuId;
 
const navigatetoaddmenu =()=>{
    navigate("/dashboard/addmenulabels",{ state: { menuId } })

};
 
const navigatetoaddSubbmenulabel =(idmenulabel:any)=>{
    navigate("/dashboard/listsubmenu",{ state: { idmenulabel } });

};

  const fetcheMenuLabel = async (): Promise<MenuLabel[]> => {
    try {
   
      const menulabelData = await apiService.GetListMenuLabel(ApiUrls.GETLISTLABELBYID+menuId);
      menulabelData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      return menulabelData

    } catch (error) {
      console.error('Error fetching menu data:', error);
      throw error;
    }
     
  };

  
  const editMenuLabel = async (menuLabel: MenuLabel): Promise<void> => {
    try {
      await apiService.EditMenuLabel(ApiUrls.MENULABEL + "/updatemenulabls", menuLabel.id, menuLabel);
    } catch (error) {
      console.error('Error update menu:', error);
    } 
  };

  
  const deleteMenuLabel = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteMenuLabel(ApiUrls.MENULABEL + "/deletemenulabls", id);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuList = await fetcheMenuLabel();
        setmenulabel(menuList.sort());
      } catch (error) {
        setError("Error fetching users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    return menulabel;
  };
 

    const handleNavigate = (path: string, menuId: any) => {
      navigate('/dashboard/listsubmenu',{ state: { menuId } });
 
    };

    return (
      <>
        <div>
          <h1 className="text-2xl font-bold mb-4">List Of Menus Lables</h1>
          <Button type="default"  onClick={() => navigatetoaddmenu()} >
            Add Menu Label
          </Button> 
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TableUpdateMenu<MenuLabel>
                columns={menuColumns}
                fetchData={fetchData}
                deleteData={deleteMenuLabel}
                editData={editMenuLabel} 
                navigateTo={handleNavigate}             
                     
          />
        )}
      </>
    );
}

export default Main;
