import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { ChangeEvent, useEffect, useState } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import GoodsReceiptPos from "../../../Entity/GoodsReceiptPos";
import Location from "../../../Entity/LocationPlace";
import LocationBin from "../../../Entity/LocationBin";
import LocationArea from "../../../Entity/LocationArea";
import LocationPlace from "../../../Entity/LocationPlace";

export function Main() {
    const [quantityBooked, setQuantityBooked] = useState(0);
    const [description, setDescription] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    const uselocation = useLocation();
    const idgoods = uselocation.state?.idgoods;
    const [lcArea, setLcArea] = useState<LocationArea[] | []>([]);
    const [lcBin, setLcBin] = useState<LocationBin[] | []>([]);
    const [lcPlace, setLcPlace] = useState<LocationPlace[] | []>([]);
    const [goodsReceiptPos, setOrderPosition] = useState<GoodsReceiptPos | null>({
        goodsReceiptid: idgoods,
        id: 0,
        article: "",
        quantityBooked: 0,
        description: "",
        location_area: "",
        location_bin: "",
        location_place: "",
    });

    const [locationId, setLocationId] = useState({
        areaId: 0,
        binId: 0,
        placeId: 0,
    });

    // Handle location select
    const handleChangeSelectLocation = async (
        e: ChangeEvent<HTMLSelectElement>,
        locationType: string
    ) => {
        const { name, value } = e.target;
        setLocationId((prevState) => ({ ...prevState, [name]: Number(value) }));
    };

 

    // On location area change
    useEffect(() => {
        const fetchLocationBin = async () => {
            if (locationId.areaId) {
                const selectedLcArea = lcArea.find((lc) => lc.id === locationId.areaId);
                if (selectedLcArea?.locationBinStocks)
                    setLcBin(selectedLcArea.locationBinStocks);
            }
            if (goodsReceiptPos) {
                const selectedLcArea = lcArea.find((lc) => lc.id === locationId.areaId);
                setOrderPosition({
                    ...goodsReceiptPos,
                    location_area: selectedLcArea?.area ? selectedLcArea?.area : "",
                });
            }
            setLcPlace([]);
            setLocationId({ ...locationId, binId: 0 });
        };
        fetchLocationBin();
    }, [locationId.areaId]);

    // On location bin change
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
        if (goodsReceiptPos) {
            const selectedLcBin = lcBin.find((lc) => lc.id === locationId.binId);
            setOrderPosition({
                ...goodsReceiptPos,
                location_bin: selectedLcBin?.bin ? selectedLcBin?.bin : "",
            });
        }
        setLcPlace([]);
        setLocationId({ ...locationId, placeId: 0 });
        fetchLocationPlace();
    }, [locationId.binId]);

    // On location place change
    useEffect(() => {
        if (goodsReceiptPos) {
            const selectedLcPlace = lcPlace.find(
                (lc) => lc.id === locationId.placeId
            );
            setOrderPosition({
                ...goodsReceiptPos,
                location_place: selectedLcPlace?.place ? selectedLcPlace?.place : "",
            });
        }
    }, [locationId.placeId]);

    const fetchData = async () => {
        try {
            const locationArea = await apiService.GetLocationAreaList(
                ApiUrls.LOCATIONAREA
            );
            setLcArea(locationArea);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function validateGoodsReceiptPos(goodsReceiptPos: GoodsReceiptPos) {
        console.log(goodsReceiptPos)
        if (goodsReceiptPos.quantityBooked <= 0) {
            return "Quantity must be greater than 0";
        }
        if (goodsReceiptPos.description.trim() === "") {
            return "Description cannot be empty";
        }
        if (locationId.areaId === 0) {
            return "Location area is required.";
        }
        if (locationId.binId === 0) {
            return "Location bin is required.";
        }
        if (locationId.placeId === 0) {
            return "Location place is required.";
        }

        return null;
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (goodsReceiptPos) {
        setOrderPosition({ ...goodsReceiptPos, [e.target.name]: e.target.value });
       }
    };

    const validateInput = async () => {
        if (goodsReceiptPos) {
            console.log(goodsReceiptPos)
            const validationError = validateGoodsReceiptPos(goodsReceiptPos);
            try {
                if (validationError) {
                    setAlertMessage(validationError);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000); // 3-second delay
                } else {
                    console.log(goodsReceiptPos);
                    // Add API call to add goods receipt pos
                     await apiService.AddGoodsReceiptPos(ApiUrls.GOODSRECEIPTPOS,goodsReceiptPos);
                    navigate("/dashboard/listgoodsreceiptpos"); // Redirect to dashboard or any other page  
                }
            } catch (error:any) {
                setAlertMessage(error.response.data);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000); // 3-second delay
                console.error("Error adding goods receipt pos:", error);
            }
        }
    };

    return (
        <>
            <div>
                <DarkModeSwitcher />
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
                                Add Goods Receipt Position
                            </h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="quantity-booked"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Quantity Booked
                                    </label>
                                    <div className="mt-2">
                                        <input
                                             name="quantityBooked"
                                            value={goodsReceiptPos?.quantityBooked}
                                            onChange={(e) => handleInputChange(e)}                                            type="number"
                                            id="quantity-booked"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        name="description"
                                            value={goodsReceiptPos?.description}
                                            onChange={(e) => handleInputChange(e)}                                            type="text"
                                            id="description"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div>
                                        <label
                                            htmlFor="location-area"
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
                                                <option value={0} disabled>
                                                    Choose Location Area
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
                                            htmlFor="location-bin"
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
                                                <option value={0} disabled>
                                                    Choose Location Bin
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
                                            htmlFor="location-place"
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
                                                <option value={0} disabled>
                                                    Choose Location Place
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
                            </div>
                        </div>
                    </div>
                </form>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => navigate("/dashboard/listgoodsreceiptpos")}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={validateInput}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
export default Main;
