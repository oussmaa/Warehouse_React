import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useEffect, useState } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import GoodsReceiptPos from "../../../Entity/GoodsReceiptPos";
import Location from "../../../Entity/Location";
 
export function Main() {

    const [quantityBooked, setQuantityBooket] = useState(0);
    const [description, setDescription] = useState("");
    const [articleid, setArticle] = useState("");
    const [location, setLocation] = useState<Location[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [location_area, setLocationId] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
     const uselocation = useLocation();
    const idgoods = uselocation.state?.idgoods


    useEffect(() => {
 
    
        const fetcheLocation = async (): Promise<Location[]> => {
            try {
           console.log(idgoods)
              const location = await apiService.GetListLocationArea(ApiUrls.GetListLocationArea);
              location.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
              setLocation(location)
              return location
        
            } catch (error) {
              console.error('Error fetching menu data:', error);
              throw error;
            }
             
          };
    
          fetcheLocation();
      }, []);


 


    const ValidateInput = async () => {
        const goodsReceiptPos = {
            quantityBooked,
            description,
            location_area,
            idgoodesreciept:idgoods
        };

        function validateGoodsReceiptPos(goodsReceiptPos: any) {
            if (goodsReceiptPos.quantityBooked <= 0) {
                return "Quantity must be greater than 0";
            }

            if (!goodsReceiptPos.description.trim()) {
                return "Description cannot be empty";
            }


     
            return null;
        }

        const validationError = validateGoodsReceiptPos(goodsReceiptPos);

        try {
            if (validationError) {
                setAlertMessage(validationError);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000); // 3-second delay
            } else {
                // Add API call to add goods receipt pos
                await apiService.AddGoodsReceiptPos(ApiUrls.GOODSRECEIPTPOS,goodsReceiptPos);
                navigate("/dashboard/listgoodsreceiptpos"); // Redirect to dashboard or any other page
            }
        } catch (error) {
            console.error("Error adding goods receipt pos:", error);
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
                                            value={quantityBooked}
                                            onChange={(e) => setQuantityBooket(parseFloat(e.target.value))}
                                            type="number"
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            type="text"
                                            id="description"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                 
                                <div className="sm:col-span-3">
                            <label htmlFor="supplierId" className="block text-sm font-medium leading-6 text-gray-900">
                                Location
                            </label>
                            <div className="mt-2">
                                <select
                                    value={location_area}
                                    onChange={(e) => setLocationId(e.target.value)}
                                    id="locationid"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select Location</option>
                                     {location.map((loc) => (
                                        <option key={loc.id} value={loc.area}>{loc.area}</option>
                                    ))}
                                </select>
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
                        onClick={() => navigate("/dashboard")}
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
        </>
    );
}
export default Main;
