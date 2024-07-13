import { Lucide, Modal, ModalBody } from "@/base-components";
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import React from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import TableColumn from "../../../Entity/TableColumn";
import TableUpdateMenu from "../../../base-components/Table/TableUpdateMenu";
import SubMenu from "../../../Entity/SubMenu";
import MenuLabel from "../../../Entity/MenuLabel";
import { Button, Table } from "antd";
import OrderPosition from "../../../Entity/OrderPosition";

const orderPositionColumns: TableColumn<OrderPosition>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Articel", dataIndex: "article" },
  { title: "quantity", dataIndex: "quantity" },
  { title: "description", dataIndex: "description" },
  { title: "locationArea", dataIndex: "locationArea" },
  { title: "locationBin", dataIndex: "locationBin" },
  { title: "locationPlace", dataIndex: "locationPlace" },
];

const fakeOrderPositions: OrderPosition[] = [];

function Main() {
  const [orderPosition, setOrderPosition] = useState<OrderPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  console.log(orderId);
  const navigatetoAddOrderPosition = () => {
    navigate("/dashboard/addorderposition", { state: { orderId } });
  };

  const fetcheOrderPosition = async (): Promise<OrderPosition[]> => {
    try {
      const orderPositionData = await apiService.GetListOrderPosition(ApiUrls.GetOrderPosition+orderId.id);
      orderPositionData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      return orderPositionData;
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  const editSubMenu = async (ordPosition: OrderPosition): Promise<void> => {
    try {
      await apiService.EditSubMenu(
        ApiUrls.SUBMENU + "/updatesubmenu",
        ordPosition.id,
        ordPosition
      );
    } catch (error) {
      console.error("Error update menu:", error);
    }
  };

  const deleteSubMenu = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteSubMenu(ApiUrls.SUBMENU + "/deletesubmenu", id);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderPositionList = await fetcheOrderPosition();
        setOrderPosition(orderPositionList);
      } catch (error) {
        setError("Error fetching users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

 

  const ParentComponent = () => {
    const navigate = useNavigate();
  };
  const handleNavigate = (path: string, orderId: any) => {
    alert("Not found Another SubMenu");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Order Position</h1>
        <Button type="default" onClick={() => navigatetoAddOrderPosition()}>
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
