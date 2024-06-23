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
import SubMenu from "../../../Entity/SubMenu";
import MenuLabel from "../../../Entity/MenuLabel";
import { Button } from "antd";
   
 
const menuColumns: TableColumn<SubMenu>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "title" },
  { title: "Path Name", dataIndex: "pathname" },
  { title: "Date Creation", dataIndex: "defaultDate" },
 
];



function Main() {
  const [menulabel, setmenulabel] = useState<SubMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate();
  const location = useLocation();
  const menuId = location.state?.menuId.menuId;
 
const navigatetoaddmenusub =()=>{
    navigate("/dashboard/addsubmenu",{ state: { menuId } })

};
 
const navigatetoaddSubbmenulabel =(idmenulabel:any)=>{
    navigate("/dashboard/listsubmenu",{ state: { idmenulabel } });

};

  const fetcheMenuLabel = async (): Promise<SubMenu[]> => {
    try {
   
      const menulabelData = await apiService.GetListSubMenu(ApiUrls.GETSUBSUBMENUBYID+menuId);
      menulabelData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      return menulabelData

    } catch (error) {
      console.error('Error fetching menu data:', error);
      throw error;
    }
     
  };

  const editSubMenu = async (subMenuL: SubMenu): Promise<void> => {
    try {
      await apiService.EditSubMenu(ApiUrls.SUBMENU + "/updatesubmenu", subMenuL.id, subMenuL);
    } catch (error) {
      console.error('Error update menu:', error);
    } 
  };

  
  const deleteSubMenu = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteSubMenu(ApiUrls.SUBMENU + "/deletesubmenu", id);
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
 
  const ParentComponent = () => {
    const navigate = useNavigate();
  }
    const handleNavigate = (path: string, menuId: any) => {
      alert('Not found Another SubMenu')
 
    };

    return (
      <>
        <div>
          <h1 className="text-2xl font-bold mb-4">List Sub Menus  </h1>
          <Button type="default"  onClick={() => navigatetoaddmenusub()} >
            Add Menu Label
          </Button> 
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <TableUpdateMenu<SubMenu>
                columns={menuColumns}
                fetchData={fetchData}
                deleteData={deleteSubMenu}
                editData={editSubMenu} 
                navigateTo={handleNavigate}             
                     
          />
        )}
      </>
    );
}

export default Main;
