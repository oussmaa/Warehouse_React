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
import LocationPlace from "../../../Entity/LocationPlace";
     
   
  const locationPlaceColumns: TableColumn<LocationPlace>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Place", dataIndex: "Place" },
    { title: "Date Creation", dataIndex: "LocalDateTime" },
   
  ];
  
  
  
  function Main() {
    const [locationBIn, setLocationPlace] = useState<LocationPlace[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
  
    const navigate = useNavigate();
    const location = useLocation();
    const locationBinId = location.state?.locationBinId;
    
    const navigatetoaddLocationPlace =()=>{
        navigate("/dashboard/addlocationplace",{ state: { locationBinId } });
    };
   

  
    const fetcheLocationPlace = async (): Promise<LocationPlace[]> => {
        console.log("id : " + locationBinId);
      try {
        const locationBin = await apiService.GetLocationPlaceListById(ApiUrls.LOCATIONPLACE,locationBinId.id);
        locationBin.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        return locationBin
  
      } catch (error) {
        console.error('Error fetching location bin data:', error);
        throw error;
      }
       
    };
  
    const editLocationPlace = async (locationPlace: LocationPlace): Promise<void> => {
      try {
        await apiService.EditLocationPlace(ApiUrls.LOCATIONPLACE, locationPlace.id, locationPlace);
      } catch (error) {
        console.error('Error update location place :', error);
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
        console.log("from use effect list lcbin", locationBinId);
      const fetchData = async () => {
        try {
          const locationPlaceList = await fetcheLocationPlace();
          setLocationPlace(locationPlaceList.sort());
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
      const handleNavigate = (path: string, menuId: any) => {
        alert('Not found Another SubMenu')
   
      };
  
      return (
        <>
          <div>
            <h1 className="text-2xl font-bold mb-4">List Location Bin  </h1>
            <Button type="default"  onClick={() => navigatetoaddLocationPlace()} >
              Add Location Bin
            </Button> 
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Table<LocationPlace>
                  columns={locationPlaceColumns}
                  fetchData={fetchData}
                  deleteData={DeleteLocationBin}
                  editData={editLocationPlace} 
                  navigateTo={handleNavigate}             
                       
            />
          )}
        </>
      );
  }
  
  export default Main;
  