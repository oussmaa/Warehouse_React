import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import TableColumn from "../../../Entity/TableColumn";
import Table from "../../../base-components/Table/Table";
import PikingPosition from "../../../Entity/PikingPosition";
import { Alert, Button } from "antd";

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

const fakePikingPositions: PikingPosition[] = [];

function Main() {
  const [pikingPosition, setPikingPosition] = useState<PikingPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const location = useLocation();
  const pickingId = location.state?.pickid.id;

  const fetchPikingPosition = async (): Promise<PikingPosition[]> => {
    try {
      const pikingPositionData = await apiService.GetListPickingPosition(
        ApiUrls.PICKINGPOSITION + pickingId
      );
      pikingPositionData.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
      return pikingPositionData;
    } catch (error) {
      console.error("Error fetching picking position data:", error);
      throw error;
    }
  };

  const editPikingPosition = async (pikPosition: PikingPosition): Promise<void> => {
    try {
      await apiService.EditSubMenu(ApiUrls.SUBMENU + "/updatepikingposition", pikPosition.id, pikPosition);
    } catch (error) {
      console.error("Error updating picking position:", error);
    }
  };

  const deletePikingPosition = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteSubMenu(ApiUrls.SUBMENU + "/deletepikingposition", id);
    } catch (error) {
      console.error("Error deleting picking position:", error);
    }
  };

  const handleBookAction = async (pikPosition: PikingPosition) => {
  console.log(pikPosition.quantity)
  
       try {

        const respons =  await apiService.bookPosition(ApiUrls.BOOKPOSITION+pikPosition.id, parseFloat(pikPosition.quantity));
        const updatedPikingPositionList = await fetchPikingPosition();
        setPikingPosition(updatedPikingPositionList.sort((a, b) => a.id - b.id));
        setAlertVisible(false);

    } catch (error:any) {
       setAlertType('error');
      setAlertMessage('Error');
      setAlertDescription(error.response.data);
      setAlertVisible(true);
     }
    finally{

    }


  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pikingPositionList = await fetchPikingPosition();
        setPikingPosition(pikingPositionList.sort((a, b) => a.id - b.id));
      } catch (error) {
        setError("Error fetching picking positions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    {alertVisible && (
        <Alert
          message={alertMessage}
          description={alertDescription}
          type={alertType}
          showIcon
          closable
          onClose={() => setAlertVisible(false)}
        />
      )}
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
