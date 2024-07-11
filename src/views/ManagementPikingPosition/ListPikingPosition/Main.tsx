import {
    Lucide,
    Modal,
    ModalBody,
  } from "@/base-components";
  import { useLocation, useNavigate } from "react-router-dom";

  import { useEffect, useState } from "react";
  import React from "react";
  import apiService from '@/Service/ApiService';
  import ApiUrls from "@/API/apiUrls";
  import TableColumn from "../../../Entity/TableColumn";
  import TableUpdateMenu from "../../../base-components/Table/TableUpdateMenu";
  import SubMenu from "../../../Entity/SubMenu";
  import MenuLabel from "../../../Entity/MenuLabel";
  import { Button} from "antd";
  import Table from "../../../base-components/Table/Table";
  import PikingPosition from "../../../Entity/PikingPosition";
  
  const pikingPositionColumns: TableColumn<PikingPosition>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Picking", dataIndex: "Picking" },
    { title: "Open Quantity", dataIndex: "openquantity" },
    { title: "Status", dataIndex: "status" },
    { title: "Booked Quantity", dataIndex: "bookedquantity" },
    { title: "Location Area", dataIndex: "locationArea" },
    { title: "Location Bin", dataIndex: "locationBin" },
    { title: "Location Place", dataIndex: "locationPlace" },
  ];
  
  const fakePikingPositions: PikingPosition[] = [
    {
      id: 1,
      Picking: "Picking 1",
      openquantity: 10,
      status: "Open",
      bookedquantity: 5,
      locationArea: "Warehouse A",
      locationBin: "A1",
      locationPlace: "Shelf 1"
    },
    {
      id: 2,
      Picking: "Picking 2",
      openquantity: 20,
      status: "Closed",
      bookedquantity: 10,
      locationArea: "Warehouse B",
      locationBin: "B2",
      locationPlace: "Shelf 2"
    },
    {
      id: 3,
      Picking: "Picking 3",
      openquantity: 15,
      status: "In Progress",
      bookedquantity: 7,
      locationArea: "Warehouse C",
      locationBin: "C3",
      locationPlace: "Shelf 3"
    },
    // Add more dummy data as needed
  ];
  
  function Main() {
    const [pikingPosition, setPikingPosition] = useState<PikingPosition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const navigate = useNavigate();
    const location = useLocation();
    const pickingId = location.state?.pickingId;
  
    const navigateToAddMenuSub = () => {
      navigate("/dashboard/addsubmenu", { state: { pickingId } });
    };
  
    const fetchPikingPosition = async (): Promise<PikingPosition[]> => {
      try {
        // const pikingPositionData = await apiService.GetListPikingPosition(ApiUrls.GETPICKINGPOSITIONBYID + pickingId);
        // pikingPositionData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        return fakePikingPositions;
      } catch (error) {
        console.error('Error fetching menu data:', error);
        throw error;
      }
    };
  
    const editPikingPosition = async (pikPosition: PikingPosition): Promise<void> => {
      try {
        await apiService.EditSubMenu(ApiUrls.SUBMENU + "/updatepikingposition", pikPosition.id, pikPosition);
      } catch (error) {
        console.error('Error updating menu:', error);
      }
    };
  
    const deletePikingPosition = async (id: number): Promise<void> => {
      try {
        await apiService.DeleteSubMenu(ApiUrls.SUBMENU + "/deletepikingposition", id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    };

    const handleNavigate = (path: string, menuId: any) => {
 
      navigate('/dashboard/listgoodsreceiptpos',{ state: { menuId } });
       
    };

    const navigateToGenerate = (path : string, orderId : any) =>{
      navigate("/dashboard/generate",{ state: { orderId } });
  }

  const handleBookAction = (pikPosition :PikingPosition)=> {}
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const pikingPositionList = await fetchPikingPosition();
          setPikingPosition(pikingPositionList.sort((a, b) => a.id - b.id));
        } catch (error) {
          setError("Error fetching users. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table<PikingPosition>
            columns={pikingPositionColumns}
            fetchData={fetchPikingPosition}
            bookAction={handleBookAction}  
            editData={editPikingPosition}
            deleteData={deletePikingPosition}
          />
        )}
      </>
    );
  }
  
  export default Main;
  