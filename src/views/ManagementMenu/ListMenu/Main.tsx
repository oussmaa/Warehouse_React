import { Lucide, Modal, ModalBody } from "@/base-components";
import { useNavigate } from "react-router-dom";

import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useEffect, useState } from "react";
import React from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
 import TableColumn from "../../../Entity/TableColumn";
import TableUpdateMenu from "../../../base-components/Table/TableUpdateMenu";
import axios from "axios";
import ApiService from "../../../Service/ApiService";
 
interface Menu {

  id:number;
  defaultDate: string;
  colorMenu: string;
  nameMenu: string;
}
const menuColumns: TableColumn<Menu>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "nameMenu" },
  { title: "Date Creation", dataIndex: "defaultDate" },
  { 
    title: "Color Menu", 
    dataIndex: "colorMenu", 
    render: (record: Menu) => (
      <div style={{ backgroundColor: String(record) ?? 'transparent', width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc' }}></div>
    )
  },
 
 
];
 
function Main() {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
 
 

  const fetchMenu = async (): Promise<Menu[]> => {
    try {
       const menuData = await apiService.GetListMenu(ApiUrls.GETALLMENU);
       menuData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      return menuData;
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuList = await fetchMenu();
        setMenu(menuList.sort());
      } catch (error) {
        setError("Error fetching users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    return menu;
  };
  const deleteMenu = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteMenu(ApiUrls.MENU, id);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  
  const editMenu= async (menu: Menu): Promise<void> => {
    try {
      await apiService.EditMenu(ApiUrls.MENU, menu.id, menu);
    } catch (error) {
      console.error('Error update menu:', error);
    } 
  };
  const path = async () => {
    return '/dashboard/listmenulabels';
  };

  const ParentComponent = () => {
    const navigate = useNavigate();
  }
    const handleNavigate = (path: string, menuId: any) => {
      navigate('/dashboard/listmenulabels',{ state: { menuId } });
       
    };
 
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Menus</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TableUpdateMenu<Menu>
              columns={menuColumns}
              fetchData={fetchData}
              deleteData={deleteMenu}
              editData={editMenu} 
              navigateTo={handleNavigate}             
                   
        />
      )}
    </>
  );
};

export default Main;
