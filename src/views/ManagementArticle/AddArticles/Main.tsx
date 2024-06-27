// React component for adding an article

import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import React, { useState } from "react";
import { useEffect } from "react";

import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/base-components";
import Article from "../../../Entity/Article";
import axios from "axios";
import ApiService from "../../../Service/ApiService";

function Main() {
  const [Articel, setArticel] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [TypeArticle, setTypeArticle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0.0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();



  function validateArticle(article:Article) {
    if (typeof article.articel !== "string" || article.articel.trim() === "") {
      return "Invalid article name";
    }

    if (typeof article.typeArticle !== "string" || article.typeArticle.trim() === "") {
      return "Invalid article type";
    }

    if (typeof article.description !== "string" || article.description.trim() === "") {
      return "Invalid description";
    }

    if (typeof article.price !== "number" || article.price <= 0) {
      return "Invalid price";
    }

    return null;
  }

  const ValidateInput = async () => {
    const article : Article= {
        id:0,
        articel:Articel,
        creationDate:creationDate,
        typeArticle:TypeArticle,
        description:  Description,
        price:Price
    };

    const validationError = validateArticle(article);

    try {
      if (validationError) {
        setAlertMessage(validationError);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); // 3-second delay
      } else {
        await ApiService.AddArticel(ApiUrls.ARTICLEAPI, article);
        navigate("/dashboard/listarticles");
      }
    } catch (error) {
      console.error("Error adding article:", error);
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
                Article Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="article-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Article Name
                  </label>
                  <div className="mt-2">
                    <input
                      value={Articel}
                      onChange={(e) => setArticel(e.target.value)}
                      type="text"
                      id="article-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="creation-date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Creation Date
                  </label>
                  <div className="mt-2">
                    <input
                      value={creationDate}
                      onChange={(e) => setCreationDate(e.target.value)}
                      type="datetime-local"
                      id="creation-date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="type-article"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Article Type
                  </label>
                  <div className="mt-2">
                    <input
                      value={TypeArticle}
                      onChange={(e) => setTypeArticle(e.target.value)}
                      type="text"
                      id="type-article"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      id="description"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      value={Price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      type="number"
                      id="price"
                      step="0.01"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
