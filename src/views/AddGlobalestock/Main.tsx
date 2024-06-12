import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import  Globalestock from "../../Entity/Globalestock";
import  Article from "../../Entity/Article";

function Main() {
  const [quantityUsed, setQuantityUsed] = useState<number | "">("");
  const [articleId, setArticleId] = useState<number | "">("");
  const [openingQuantity, setOpeningQuantity] = useState<number | "">("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles: Article[] = await apiService.GetArticles(ApiUrls.GET_ALL_ARTICLES);
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
          article: selectedArticle,
          openingQuantity: parseFloat(openingQuantity as string),
        };

        await apiService.AddGlobalestock(ApiUrls.ADD_GLOBALESTOCK, newGlobalestock);
        navigate("/dashboard/listglobalestocks");
      } catch (error) {
        console.error("Error adding globalestock:", error);
      }
    }
  };

  return (
    <div>
      <h1>Add Globalestock</h1>
      <div>
        <label>Quantity Used:</label>
        <input
          type="number"
          value={quantityUsed}
          onChange={(e) => setQuantityUsed(e.target.value === "" ? "" : Number(e.target.value))}
        />
        {errors.quantityUsed && <p className="error">{errors.quantityUsed}</p>}
      </div>
      <div>
        <label>Article:</label>
        <select value={articleId} onChange={(e) => setArticleId(Number(e.target.value))}>
          <option value="">Select an article</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.id}
            </option>
          ))}
        </select>
        {errors.articleId && <p className="error">{errors.articleId}</p>}
      </div>
      <div>
        <label>Opening Quantity:</label>
        <input
          type="number"
          value={openingQuantity}
          onChange={(e) => setOpeningQuantity(e.target.value === "" ? "" : Number(e.target.value))}
        />
        {errors.openingQuantity && <p className="error">{errors.openingQuantity}</p>}
      </div>
      <button onClick={handleAddGlobalestock}>Add Globalestock</button>
    </div>
  );
}

export default Main;
