import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
 
import { Alert } from "@/base-components";
import Article from "../../../Entity/Article";
import Globalestock from "../../../Entity/Globalestock";
import LocationArea from "../../../Entity/LocationArea";
import LocationBin from "../../../Entity/LocationBin";
import LocationPlace from "../../../Entity/LocationPlace";

function Main() {
    const [quantityUsed, setQuantityUsed] = useState<number >(0);
    const [articleId, setArticleId] = useState<string>("");
    const [openingQuantity, setOpeningQuantity] = useState<number>();
     const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [article, setArticel] = useState<Article[] | []>([]);
    const [lcArea, setLcArea] = useState<LocationArea[] | []>([]);
    const [lcBin, setLcBin] = useState<LocationBin[] | []>([]);
    const [lcPlace, setLcPlace] = useState<LocationPlace[] | []>([]);
    const [globalestock, setGlobalestock] = useState<Globalestock | null>({
        id: 0,
        articleID: articleId,
        openingQuantity: quantityUsed,
         locationArea: "",
        locationBin: "",
        locationPlace: "",
      });
    
    const [locationId, setLocationId] = useState({
        areaId: 0,
        binId: 0,
        placeId: 0,
      });

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (globalestock) {
            setGlobalestock({ ...globalestock, [e.target.name]: e.target.value });
          console.log(globalestock);
        }
      };
    
      //--------- handle locations select
      const handleChangeSelectLocation = async (
        e: ChangeEvent<HTMLSelectElement>,
        locationType: string
      ) => {
        const { name, value } = e.target;
        setLocationId((prevState) => ({ ...prevState, [name]: Number(value) }));
      };
    
      const handleSelectArticel = (e: ChangeEvent<HTMLSelectElement>) => {
        if (globalestock)
          setGlobalestock({ ...globalestock, [e.target.name]: e.target.value });
      };
    
      //----On location area change
      useEffect(() => {
        const fetchLocationBin = async () => {
          if (locationId.areaId) {
            const selectedLcArea = lcArea.find((lc) => lc.id === locationId.areaId);
            if (selectedLcArea?.locationBinStocks)
              setLcBin(selectedLcArea.locationBinStocks);
          }
          if (globalestock) {
            const selectedLcArea = lcArea.find((lc) => lc.id === locationId.areaId);
            setGlobalestock({
              ...globalestock,
              locationArea: selectedLcArea?.area ? selectedLcArea?.area : "",
            });
            console.log(selectedLcArea);
          }
          setLcPlace([]);
          setLocationId({ ...locationId, binId: 0 });
        };
        fetchLocationBin();
      }, [locationId.areaId]);
    
      //--On location bin change
      useEffect(() => {
        const fetchLocationPlace = async () => {
          if (locationId.binId) {
            const selectedlocationBin = lcBin.find(
              (lc) => lc.id === locationId.binId
            );
            if (selectedlocationBin?.locationPlaces)
              setLcPlace(selectedlocationBin.locationPlaces);
          }
        };
        if (globalestock) {
          const selectedLcBin = lcBin.find((lc) => lc.id === locationId.binId);
          setGlobalestock({
            ...globalestock,
            locationBin: selectedLcBin?.bin ? selectedLcBin?.bin : "",
          });
          console.log(selectedLcBin);
        }
        setLcPlace([]);
        setLocationId({ ...locationId, placeId: 0 });
        fetchLocationPlace();
      }, [locationId.binId]);
    
      //--on location place change
      useEffect(() => {
        if (globalestock) {
          const selectedLcPlace = lcPlace.find(
            (lc) => lc.id === locationId.placeId
          );
          console.log("selected place " + JSON.stringify(selectedLcPlace));
          setGlobalestock({
            ...globalestock,
            locationPlace: selectedLcPlace?.place ? selectedLcPlace?.place : "",
          });
        }
      }, [locationId.placeId]);
    
      const fetchData = async () => {
        try {
          const articel = await apiService.GetListArticel(ApiUrls.ARTICLEAPI);
          const locationArea = await apiService.GetLocationAreaList(
            ApiUrls.LOCATIONAREA
          );
    
          setArticel(articel);
          setLcArea(locationArea);
          console.log(locationArea);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    

      function validate(globalstock: Globalestock ): string | null {
        if (!globalstock.articleID) {
          return "Articel is required.";
        }
        if (globalstock.openingQuantity <= 0) {
          return "Quantity should be greater than zero.";
        }
  
        if (locationId.areaId == 0) {
          return "Location area is required.";
        }
        if (locationId.binId == 0) {
          return "Location bin is required.";
        }
        if (locationId.placeId == 0) {
          return "Location place is required.";
        }
        return null;
      }


      const ValidateInput = async () => {
        if (globalestock) {
          const validationError = validate(globalestock);
          var isValid = false;
          try {
            if (validationError != null) {
              setAlertMessage(validationError + "");
              setShowAlert(!isValid);
              setTimeout(() => {
                setShowAlert(false);
              }, 3000); // 3-second delay
            } else {
              
                await apiService.AddGlobalStock(ApiUrls.GLOBALSTOCK, globalestock);
                navigate("/dashboard/liststock"); 
    
             }
          } catch (error: any) {
            setAlertMessage(error.response);
            setShowAlert(!isValid);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000); // 3-second delay
            console.error("Error fetching  data:", error);
          }
        }
      };
 

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Globalestock</h1>
            <Alert
                show={showAlert}
                className="alert-danger"
                onHidden={() => setShowAlert(false)}
            >
                {alertMessage}
            </Alert>
            <div className="space-y-6">
 
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Article:</label>
                    <select
           value={globalestock?.articleID}
           onChange={(e) => handleSelectArticel(e)}
           name="articleID"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">Select an article</option>
                        {article.map((article) => (
                            <option key={article.id} value={article.articel}>
                                {article.articel}
                            </option>
                        ))}
                    </select>
                    {errors.articleId && <p className="text-sm text-red-600 mt-1">{errors.articleId}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Opening Quantity:</label>
                    <input
                        type="number"
                      
                        value={globalestock?.openingQuantity}
                        onChange={(e) => handleInputChange(e)}
                        name="openingQuantity"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.openingQuantity && <p className="text-sm text-red-600 mt-1">{errors.openingQuantity}</p>}
                </div>
                <div className="sm:col-span-3">
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location Area
                    </label>
                    <div className="mt-2">
                      <select
                        value={locationId.areaId}
                        onChange={(e) => {
                          handleChangeSelectLocation(e, "area");
                        }}
                        name="areaId"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={0} selected disabled>
                          choose location Area
                        </option>
                        {lcArea.map((lcAr, index) => (
                          <option key={`${index}-${lcAr.id}`} value={lcAr.id}>
                            {lcAr.area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-8">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location Bin
                    </label>
                    <div className="mt-2">
                      <select
                        value={locationId.binId}
                        onChange={(e) => {
                          handleChangeSelectLocation(e, "bin");
                        }}
                        name="binId"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={0} selected disabled>
                          choose location Bin
                        </option>
                        {lcBin.map((lcBn, index) => (
                          <option key={`${index}-${lcBn.id}`} value={lcBn.id}>
                            {lcBn.bin}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-8">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Location Place
                    </label>
                    <div className="mt-2">
                      <select
                        value={locationId.placeId}
                        onChange={(e) => {
                          handleChangeSelectLocation(e, "place");
                        }}
                        name="placeId"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={0} selected disabled>
                          choose location Place
                        </option>
                        {lcPlace.map((lcPl, index) => (
                          <option key={`${index}-${lcPl.id}`} value={lcPl.id}>
                            {lcPl.place}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => navigate("/dashboard/listglobalestocks")}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={ValidateInput}
                    >
                        Add Globalestock
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Main;
