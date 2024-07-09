import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useState, useEffect, ChangeEvent } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import RolesRequest from "../../../Entity/RolesRequest";
import Users from "../../../Entity/Users";
import Menu from "../../../Entity/Menu";
import { number } from "prop-types";
import OrderPosition from "../../../Entity/OrderPosition";
import Article from "../../../Entity/Article";
import LocationArea from "../../../Entity/LocationArea";
import LocationBin from "../../../Entity/LocationBin";
import LocationPlace from "../../../Entity/LocationPlace";



function Main() {
  const [Locked, setLocked] = useState("");

  //data to fech
  const [articel, setArticel] = useState<Article[] | []>([]);
  const [lcArea, setLcArea] = useState<LocationArea[] | []>([]);
  const [lcBin, setLcBin] = useState<LocationBin[] | []>([]);
  const [lcPlace, setLcPlace] = useState<LocationPlace[] | []>([]);
  //-----


  //data to insert
  const [orderPosition, setOrderPosition] = useState<OrderPosition | null>({
    id: 0,
    orderId : 0,
    articel : "",
    quantity : 0,
    description : "",
    locationArea : "",
    locationBin : "",
    loactionPlace : ""
  })

  const [locationId, setLocationId] = useState({
    areaId : 0,
    binId : 0,
    placeId : 0
  })
  //-----



  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");



  function validateorderPosition(/*ordPosition: OrderPosition**/): string | null {
    return null;
  }


  const ValidateInput = async () => {


    const validationError = validateorderPosition(/*orderPosition**/);
    var isValid = false;

    try {
      if (validationError != null) {
        setAlertMessage(validationError + "");

        setShowAlert(!isValid);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); // 3-second delay
      } else {
        console.log("clg add orderPosition : " + JSON.stringify(orderPosition));
        const response = await apiService.AddOrderPosition(ApiUrls.AddOrderPosition, orderPosition);

        navigate("/dashboard/listorderPositions");
      }
    } catch (error: any) {
      setAlertMessage(error.response.data.message);
      setShowAlert(!isValid);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3-second delay
      console.error("Error fetching menu data:", error);
    }
  };

  const handleInputChange = (e : ChangeEvent<HTMLInputElement>)=>{
    if(orderPosition){
        setOrderPosition({...orderPosition, [e.target.name] : e.target.value});
      }
  }



  const handleChangeSelectLocation = async (e: ChangeEvent<HTMLSelectElement>, locationType: string) => {
    const { name, value } = e.target;
    setLocationId((prevState) => ({ ...prevState, [name]: Number(value) }));
  };

  useEffect(() => {
    const fetchLocationBin = async () => {
      if (locationId.areaId) {
        const locationBin = await apiService.GetLocationBinListById(ApiUrls.LOCATIONBIN, locationId.areaId);
        setLcBin(locationBin);
      }
      setLcPlace([]);
      setLocationId({...locationId, binId : 0})
    };

    fetchLocationBin();
  }, [locationId.areaId]);

  useEffect(() => {
    const fetchLocationPlace = async () => {
      if (locationId.binId) {
        const locationPlace = await apiService.GetLocationPlaceListById(ApiUrls.LOCATIONPLACE, locationId.binId);
        setLcPlace(locationPlace);
      }
    };

    fetchLocationPlace();
  }, [locationId.binId]);

  const fetchData = async () => {
    try {
      const articel = await apiService.GetListArticel(ApiUrls.ARTICLEAPI);
      const locationArea = await apiService.GetLocationAreaList(ApiUrls.LOCATIONAREA);

      setArticel(articel);
      setLcArea(locationArea);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <form>
          <Alert
            show={showAlert}
            className="alert-danger"
            onHidden={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Order Position
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      value={orderPosition?.description}
                      onChange={(e) => handleInputChange(e)}
                      name="description"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      value={orderPosition?.quantity}
                      onChange={(e) => handleInputChange(e)}
                      name="quantity"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Articel
                  </label>
                  <div className="mt-2">
                    <select
                      value={Locked}
                      onChange={(e) => setLocked(e.target.value)}
                      name="Locked"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        {
                          articel.map((artc, index) => (
                            <option key={`${index}-${artc.id}`} value={artc.id}>
                              {artc.articel}
                            </option>
                          ))
                        }
                    </select>
                  </div>
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
                      onChange={(e) => {handleChangeSelectLocation(e, "area")}}
                      name="areaId"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option value={0} selected disabled>
                            choose location Area
                        </option>
                        {
                          lcArea.map((lcAr, index) => (
                            <option key={`${index}-${lcAr.id}`} value={lcAr.id}>
                              {lcAr.area}
                            </option>
                          ))
                        }
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
                          onChange={(e) => {handleChangeSelectLocation(e, "bin")}}
                          name="binId"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={0} selected disabled>
                                choose location Bin
                            </option>
                            {
                              lcBin.map((lcBn, index) => (
                                <option key={`${index}-${lcBn.id}`} value={lcBn.id}>
                                  {lcBn.bin}
                                </option>
                              ))
                            }
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
                          onChange={(e) => {handleChangeSelectLocation(e, "place")}}
                          name="placeId"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option value={0} selected disabled>
                                choose location Place
                            </option>
                            {
                              lcPlace.map((lcPl, index) => (
                                <option key={`${index}-${lcPl.id}`} value={lcPl.id}>
                                  {lcPl.place}
                                </option>
                              ))
                            }
                        </select>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6 mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={ValidateInput}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Main;
