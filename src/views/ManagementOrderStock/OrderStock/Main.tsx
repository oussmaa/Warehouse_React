import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useState, useEffect } from "react";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import Supplier from "../../../Entity/Supplier";
import Article from "../../../Entity/Article";
 
 
  function Main() {
     const [description, setDescription] = useState("");
    const [quantityNeeded, setQuantityNeeded] = useState<number>();
    const [supplierId, setSupplierId] = useState("");
    const [articleId, setArticleId] = useState("");
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    

  useEffect(() => {
         const fetchSuppliers = async () => {
            try {
                const suppliersData = await apiService.GetListSupplier(ApiUrls.SUPPLIER);
                setSuppliers(suppliersData);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                setAlertMessage("Error fetching suppliers");
                setShowAlert(true);
            }
        };

        const fetchArticles = async () => {
            try {
                const articlesData = await apiService.GetListArticel(ApiUrls.ARTICLEAPI);
                console.log("aertc data : " + articlesData);
                setArticles(articlesData);
                console.log("articels ! " + articles);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setAlertMessage("Error fetching articles");
                setShowAlert(true);
            }
        };

        fetchSuppliers();
        fetchArticles(); 
   }, []);    
 
    const validateInput = () => {
        if (!description.trim()) {
            return "Description cannot be empty";
        }
        if (isNaN(Number(quantityNeeded)) || Number(quantityNeeded) <= 0) {    
             return "Quantity Needed must be a positive number";
        }
        if (!supplierId) {
            return "Supplier must be selected";
        }
        if (!articleId) {
            return "Article must be selected";
        }
        return null;
    };

    const addOrderStock = async () => {
        
        const validationError = validateInput();
        if (validationError) {
            setAlertMessage(validationError);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
            return;
        } 

         const newOrderStock = {
        
            Description: description,
            QuantityNeeded: quantityNeeded,
            supplier_id: supplierId,
            article_id: articleId
        };

        try {
            await apiService.AddOrderStock(ApiUrls.ORDERSTOCK  + "/addstock", newOrderStock);
            console.log("added with succussfully");
            //navigate("/dashboard"); // Redirect to dashboard or any other page after successful addition
        } catch (error) {
            console.error("Error adding order stock:", error);
            setAlertMessage("Error adding order stock");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
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
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* Order Stock Number Input */}
 

                        {/* Description Input */}
                        <div className="sm:col-span-3">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
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

                        {/* Quantity Needed Input */}
                        <div className="sm:col-span-3">
                            <label htmlFor="quantityNeeded" className="block text-sm font-medium leading-6 text-gray-900">
                                Quantity Needed
                            </label>
                            <div className="mt-2">
                                <input
                                    value={quantityNeeded}
                                    onChange={(e) => setQuantityNeeded(e.target.value as unknown as number)}
                                    type="number"
                                    id="quantityNeeded"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* Supplier Dropdown */}
                        <div className="sm:col-span-3">
                            <label htmlFor="supplierId" className="block text-sm font-medium leading-6 text-gray-900">
                                Supplier
                            </label>
                            <div className="mt-2">
                                <select
                                    value={supplierId}
                                    onChange={(e) => setSupplierId(e.target.value)}
                                    id="supplierId"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select Supplier</option>
                                    <option value={1}>1</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Article Dropdown */}
                        <div className="sm:col-span-3">
                            <label htmlFor="articleId" className="block text-sm font-medium leading-6 text-gray-900">
                                Article
                            </label>
                            <div className="mt-2">
                                <select
                                    value={articleId}
                                    onChange={(e) => setArticleId(e.target.value)}
                                    id="articleId"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option disabled value="">Select Article</option>
                                    {articles.map((article) => (
                                        <option key={article.id} value={article.id}>{article.articel}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                     
                    </div>
          
                </form>
                <div className="mt-6 flex items-center justify-end gap-x-6">
      
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addOrderStock}
          >
            Save
          </button>
        </div>
            </div>
        </>
    );
}

export default Main;
