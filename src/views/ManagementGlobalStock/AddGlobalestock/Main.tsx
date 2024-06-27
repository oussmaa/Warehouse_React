import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
 
import { Alert } from "@/base-components";
import Article from "../../../Entity/Article";
import Globalestock from "../../../Entity/Globalestock";

function Main() {
    const [quantityUsed, setQuantityUsed] = useState<number | "">("");
    const [articleId, setArticleId] = useState<number | "">("");
    const [openingQuantity, setOpeningQuantity] = useState<number | "">("");
    const [articles, setArticles] = useState<Article[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles: Article[] = await apiService.GetListArticel(ApiUrls.ARTICLEAPI);
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchArticles();
    }, []);

    const validateForm = () => {
        let errors: { [key: string]: string } = {};
        let isValid = true;

        if (quantityUsed === "" || isNaN(Number(quantityUsed))) {
            errors.quantityUsed = "Valid Quantity Used is required";
            isValid = false;
        }

        if (articleId === "") {
            errors.articleId = "Article is required";
            isValid = false;
        }

        if (openingQuantity === "" || isNaN(Number(openingQuantity))) {
            errors.openingQuantity = "Valid Opening Quantity is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleAddGlobalestock = async () => {
        if (validateForm()) {
            try {
                const selectedArticle = articles.find(article => article.id === articleId);
                if (!selectedArticle) {
                    setErrors({ articleId: "Selected article not found" });
                    return;
                }

                const newGlobalestock: Globalestock = {
                    quantityUsed: parseFloat(quantityUsed as string),
                    articleId: selectedArticle.id,
                    openingQuantity: parseFloat(openingQuantity as string),
                    id: 0
                };

                await apiService.AddGlobalStock(ApiUrls.GLOBALSTOCK, newGlobalestock);
                navigate("/dashboard/liststock");
            } catch (error) {
                console.error("Error adding globalestock:", error);
            }
        } else {
          //  setAlertMessage("Please correct the highlighted errors and try again.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
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
                    <label className="block text-sm font-medium leading-6 text-gray-900">Quantity Used:</label>
                    <input
                        type="number"
                        value={quantityUsed}
                        onChange={(e) => setQuantityUsed(e.target.value === "" ? "" : Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.quantityUsed && <p className="text-sm text-red-600 mt-1">{errors.quantityUsed}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Article:</label>
                    <select
                        value={articleId}
                        onChange={(e) => setArticleId(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">Select an article</option>
                        {articles.map((article) => (
                            <option key={article.id} value={article.id}>
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
                        value={openingQuantity}
                        onChange={(e) => setOpeningQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.openingQuantity && <p className="text-sm text-red-600 mt-1">{errors.openingQuantity}</p>}
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
                        onClick={handleAddGlobalestock}
                    >
                        Add Globalestock
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Main;
