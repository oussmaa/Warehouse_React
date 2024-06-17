import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useState } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import GoodsReceiptPos from "../../../Entity/GoodsReceiptPos";
 
export function Main() {
    const [quantityBooket, setQuantityBooket] = useState(0);
    const [description, setDescription] = useState("");
    const [articleid, setArticle] = useState("");
    const [goodsReceiptid, setGoodsReceiptid] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    const ValidateInput = async () => {
        const goodsReceiptPos: GoodsReceiptPos = {
            id:0,
            quantityBooket,
            description,
            articleid, // Assuming you will set this later based on the selected article
            goodsReceiptid,
        };

        function validateGoodsReceiptPos(goodsReceiptPos: GoodsReceiptPos) {
            if (goodsReceiptPos.quantityBooket <= 0) {
                return "Quantity must be greater than 0";
            }

            if (!goodsReceiptPos.description.trim()) {
                return "Description cannot be empty";
            }

            if (goodsReceiptPos.articleid.trim()=="") {
                return "Article cannot be empty";
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
                await apiService.AddGoodsReceiptPos(ApiUrls.ADD_GOODS_RECEIPT_POS, goodsReceiptPos);
                navigate("/dashboard"); // Redirect to dashboard or any other page
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
                                            value={quantityBooket}
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
                                    <label
                                        htmlFor="article"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Article
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={articleid}
                                            onChange={(e) => setArticle(e.target.value)}
                                            type="text"
                                            id="articleid"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="goods-receipt-id"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Goods Receipt ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={goodsReceiptid}
                                            onChange={(e) => setGoodsReceiptid(parseFloat(e.target.value))}
                                            type="number"
                                            id="goods-receipt-id"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
