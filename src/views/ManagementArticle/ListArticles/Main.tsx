// Main.tsx

import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import Article from "../../../Entity/Article";
import TableColumn from "../../../Entity/TableColumn"; // Assuming TableColumn definition is reused
import axios from "axios";
import ApiService from "../../../Service/ApiService";
import ApiUrls from "../../../API/apiUrls";

const articleColumns: TableColumn<Article>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Creation Date", dataIndex: "creationDate" },
  { title: "Type", dataIndex: "typeArticle" },
  { title: "Description", dataIndex: "description" },
  { title: "Price", dataIndex: "price" },
  { title: "Article", dataIndex: "articel" },
];

// Implement fetchArticles, deleteArticle, and editArticle functions similarly as done for suppliers

const fetchArticles = async (): Promise<Article[]> => {
  // Mock data, replace with actual API call logic
  try {
    const response  = await ApiService.GetListArticel(ApiUrls.ARTICLEAPI);
    return response;
  }catch(err){
    console.log("Error fetching data" + err);
    throw err;
  }
};

const deleteArticle = async (id: number): Promise<void> => {
  try {
    const response = await ApiService.DeletetArticel(ApiUrls.ARTICLEAPI, id);
    console.log('Article deleted:', response);
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};

const editArticle = async (article: Article): Promise<void> => {
  try {
    const response = await ApiService.EditArticel(ApiUrls.ARTICLEAPI, article.id, article);
  } catch (error) {
    console.error('Error update article:', error);
  }
  console.log("Edit article:", article);
};

const Main = () => {



  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Articles</h1>
      </div>
      <Table<Article>
        columns={articleColumns}
        fetchData={fetchArticles}
        deleteData={deleteArticle}
        editData={editArticle}
      />
    </>
  );
};

export default Main;
