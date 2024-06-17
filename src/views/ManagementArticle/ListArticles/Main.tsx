// Main.tsx

import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import Article from "../../../Entity/Article";
import TableColumn from "../../../Entity/TableColumn"; // Assuming TableColumn definition is reused

const articleColumns: TableColumn<Article>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Creation Date", dataIndex: "creationDate" },
  { title: "Type", dataIndex: "TypeArticle" },
  { title: "Description", dataIndex: "Description" },
  { title: "Price", dataIndex: "Price" },
  { title: "Article", dataIndex: "Articel" },
];

// Implement fetchArticles, deleteArticle, and editArticle functions similarly as done for suppliers

const fetchArticles = async (): Promise<Article[]> => {
  // Mock data, replace with actual API call logic
  return [
    {
      id: 1,
      creationDate: "2024-06-17",
      TypeArticle: "Type A",
      Description: "Description of Article 1",
      Price: 100,
      Articel: "Article 1",
    },
    {
      id: 2,
      creationDate: "2024-06-16",
      TypeArticle: "Type B",
      Description: "Description of Article 2",
      Price: 150,
      Articel: "Article 2",
    },
    // Add more articles as needed
  ];
};

const deleteArticle = async (id: number): Promise<void> => {
  console.log("Delete article with ID:", id);
};

const editArticle = async (article: Article): Promise<void> => {
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
