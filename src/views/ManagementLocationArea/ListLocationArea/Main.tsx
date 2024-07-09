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
import Table from "../../../base-components/Table/Table";
import LocationArea from "../../../Entity/LocationArea";
 
// interface Menu {

//   id:number;
//   defaultDate: string;
//   colorMenu: string;
//   nameMenu: string;
// }
const menuColumns: TableColumn<LocationArea>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Area", dataIndex: "area" },
  { title: "Date Creation", dataIndex: "creationDate" },
 
 
];
 
function Main() {
  const [locationArea, setLocationArea] = useState<LocationArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
 
 

  const fetchLocationArea = async (): Promise<LocationArea[]> => {
    try {
       const locationAreaData = await apiService.GetLocationAreaList(ApiUrls.LOCATIONAREA);
       console.log(locationAreaData);
       locationAreaData.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      return locationAreaData;
    } catch (error) {
      console.error("Error fetching locationArea data:", error);
      throw error;
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationAreaList = await fetchLocationArea();
        setLocationArea(locationAreaList.sort());
        console.log("locatio ar from use effect " + [...locationAreaList]);
      } catch (error) {
        setError("Error fetching users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    return locationArea;
  };
  const deleteLocationArea = async (id: number): Promise<void> => {
    try {
      await apiService.DeleteLocationArea(ApiUrls.LocationArea, id);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  
  const editLocationArea= async (locationArea: LocationArea): Promise<void> => {
    try {
      await apiService.EditLocationArea(ApiUrls.LOCATIONAREA, locationArea.id, locationArea);
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
    const handleNavigate = (path: string, locationAreaId: any) => {
      navigate('/dashboard/listlocationbin',{ state: { locationAreaId } }); 
       
    };
 
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of location Area</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table<LocationArea>
              columns={menuColumns}
              fetchData={fetchData}
              deleteData={deleteLocationArea}
              editData={editLocationArea} 
              navigateTo={handleNavigate}
              displayBtnTex="Display Location bin"
        />
      )}
    </>
  );
};

export default Main;
