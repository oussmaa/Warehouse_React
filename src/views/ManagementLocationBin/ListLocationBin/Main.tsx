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
//   import locationBIn from "../../../Entity/locationBIn";
  import { Button } from "antd";
  import Table from "../../../base-components/Table/Table";
import LocationBin from "../../../Entity/LocationBin";
     
   
  const locationBinColumns: TableColumn<LocationBin>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Bin", dataIndex: "Bin" },
    { title: "Date Creation", dataIndex: "creationDate" },
   
  ];
  
  
  
  function Main() {
    const [locationBIn, setLocationBIn] = useState<LocationBin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
  
    const navigate = useNavigate();
    const location = useLocation();
    const locationAreaId = location.state?.locationAreaId;
    
    const navigatetoaddLocationBin =()=>{
        navigate("/dashboard/addlocationbin",{ state: { locationAreaId } })
    
    };
   

  
    const fetcheLocationBin = async (): Promise<LocationBin[]> => {
        console.log("id : " + locationAreaId);
      try {
     
        const locationBin = await apiService.GetLocationBinListById(ApiUrls.LOCATIONBIN,locationAreaId.id);
        locationBin.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        return locationBin
  
      } catch (error) {
        console.error('Error fetching location bin data:', error);
        throw error;
      }
       
    };
  
    const editLocationBin = async (locationBin: LocationBin): Promise<void> => {
      try {
        await apiService.EditLocationBin(ApiUrls.LOCATIONBIN, locationBin.id, locationBin);
      } catch (error) {
        console.error('Error update location bin:', error);
      } 
    };
  
    
    const DeleteLocationBin = async (id: number): Promise<void> => {
      try {
        await apiService.DeleteLocDeleteLocationBin(ApiUrls.LOCATIONBIN, id);
      } catch (error) {
        console.error('Error deleting location bin:', error);
      }
    };
  
    useEffect(() => {
        console.log("from use effect list lcbin", locationAreaId);
      const fetchData = async () => {
        try {
          const locationBinList = await fetcheLocationBin();
          setLocationBIn(locationBinList.sort());
        } catch (error) {
          setError("Error fetching location bin. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const fetchData = async () => {
      return locationBIn;
    };
   
    const ParentComponent = () => {
      const navigate = useNavigate();
    }
      const handleNavigate = (path: string, locationBinId: any) => {
        navigate('/dashboard/listLocationplace',{ state: { locationBinId } });
      };
  
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold mb-4">List Location Bin  </h1>
            <Button type="default"  onClick={() => navigatetoaddLocationBin()} >
              Add Location Bin
            </Button> 
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Table<LocationBin>
                  columns={locationBinColumns}
                  fetchData={fetchData}
                  deleteData={DeleteLocationBin}
                  editData={editLocationBin} 
                  navigateTo={handleNavigate}             
                       
            />
          )}
        </>
      );
  }
  
  export default Main;
  