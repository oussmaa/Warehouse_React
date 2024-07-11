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
  import { Button, Table } from "antd";
  import OrderPosition from "../../../Entity/OrderPosition";
  
  const orderPositionColumns: TableColumn<OrderPosition>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Order", dataIndex: "orderId" },
    { title: "Articel", dataIndex: "articel" },
    { title: "quantity", dataIndex: "quantity" },
    { title: "description", dataIndex: "description" },
    { title: "locationArea", dataIndex: "locationArea" },
    { title: "locationBin", dataIndex: "locationBin" },
    { title: "locationPlace", dataIndex: "locationPlace" },
  ];
  
  const fakeOrderPositions: OrderPosition[] = [
    {
      id: 1,
      orderId: 101,
      articel: "Laptop",
      quantity: 3,
      description: "High performance laptop",
      locationArea: "Warehouse A",
      locationBin: "A12B3",
      locationPlace: "Shelf 5"
    },
    {
      id: 2,
      orderId: 102,
      articel: "Smartphone",
      quantity: 5,
      description: "Latest model smartphone",
      locationArea: "Warehouse B",
      locationBin: "B34C4",
      locationPlace: "Shelf 2"
    },
    {
      id: 3,
      orderId: 103,
      articel: "Headphones",
      quantity: 10,
      description: "Noise cancelling headphones",
      locationArea: "Warehouse C",
      locationBin: "C45D6",
      locationPlace: "Shelf 1"
    },
    {
      id: 4,
      orderId: 104,
      articel: "Monitor",
      quantity: 2,
      description: "4K Ultra HD monitor",
      locationArea: "Warehouse A",
      locationBin: "A23D4",
      locationPlace: "Shelf 3"
    },
    {
      id: 5,
      orderId: 105,
      articel: "Keyboard",
      quantity: 15,
      description: "Mechanical keyboard",
      locationArea: "Warehouse B",
      locationBin: "B12A3",
      locationPlace: "Shelf 7"
    },
    {
      id: 6,
      orderId: 106,
      articel: "Mouse",
      quantity: 20,
      description: "Wireless mouse",
      locationArea: "Warehouse C",
      locationBin: "C33B2",
      locationPlace: "Shelf 4"
    },
    {
      id: 7,
      orderId: 107,
      articel: "Printer",
      quantity: 4,
      description: "All-in-one printer",
      locationArea: "Warehouse A",
      locationBin: "A56E7",
      locationPlace: "Shelf 6"
    },
    {
      id: 8,
      orderId: 108,
      articel: "Tablet",
      quantity: 7,
      description: "Latest generation tablet",
      locationArea: "Warehouse B",
      locationBin: "B78C9",
      locationPlace: "Shelf 8"
    },
    {
      id: 9,
      orderId: 109,
      articel: "Charger",
      quantity: 25,
      description: "Fast charging adapter",
      locationArea: "Warehouse C",
      locationBin: "C19F1",
      locationPlace: "Shelf 9"
    },
    {
      id: 10,
      orderId: 110,
      articel: "Camera",
      quantity: 3,
      description: "Digital SLR camera",
      locationArea: "Warehouse A",
      locationBin: "A24G8",
      locationPlace: "Shelf 10"
    }
  ];
  
  function Main() {
    const [orderPosition, setOrderPosition] = useState<OrderPosition[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.state?.orderId.orderId;
  
    const navigatetoAddOrderPosition = () => {
      navigate("/dashboard/addorderposition", { state: { orderId } })
    };
  
    const fetcheOrderPosition = async (): Promise<OrderPosition[]> => {
      try {
        // const orderPositionData = await apiService.GetListOrderPosition(ApiUrls.GETSUBSUBMENUBYID+orderId);
        // orderPositionData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        return fakeOrderPositions;
      } catch (error) {
        console.error('Error fetching menu data:', error);
        throw error;
      }
    };
  
    const editSubMenu = async (ordPosition: OrderPosition): Promise<void> => {
      try {
        await apiService.EditSubMenu(ApiUrls.SUBMENU + "/updatesubmenu", ordPosition.id, ordPosition);
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
          const orderPositionList = await fetcheOrderPosition();
          setOrderPosition(orderPositionList.sort((a, b) => a.id - b.id));
        } catch (error) {
          setError("Error fetching users. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const fetchOrderPosition = async (): Promise<OrderPosition[]> => {
      try {
        // const response  = await ApiService.GetListOrderPosition(ApiUrls.ORDER);
        //return response
        return fakeOrderPositions;
      } catch (err) {
        console.log("Error fetching data" + err);
        throw err;
      }
    };
  
    const ParentComponent = () => {
      const navigate = useNavigate();
    }
    const handleNavigate = (path: string, orderId: any) => {
      alert('Not found Another SubMenu')
    };
  
    return (
      <>
        <div>
          <h1 className="text-2xl font-bold mb-4">List Order Position</h1>
          <Button type="default" onClick={() => navigatetoAddOrderPosition()} >
            Add Order Position
          </Button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table<OrderPosition>
            columns={orderPositionColumns}
            dataSource={orderPosition}
            rowKey="id"
          />
        )}
      </>
    );
  }
  
  export default Main;
  