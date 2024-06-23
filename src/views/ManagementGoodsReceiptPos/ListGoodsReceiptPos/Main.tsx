import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
import GoodsReceiptPos from "../../../Entity/GoodsReceiptPos"; // Adjust import
import TableColumn from "../../../Entity/TableColumn"; // Adjust import

const goodsReceiptColumns: TableColumn<GoodsReceiptPos>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Quantity Booked", dataIndex: "quantityBooket" },
  { title: "Description", dataIndex: "description" },
  { title: "Article ID", dataIndex: "articleid" },
  { title: "Goods Receipt ID", dataIndex: "goodsReceiptid" },
];

const fetchGoodsReceiptPos = async (): Promise<GoodsReceiptPos[]> => {
  // Replace with your actual fetch logic for GoodsReceiptPos
  return [
    {
      id: 1,
      quantityBooket: 10,
      description: "Item 1",
      articleid: "ART001",
      goodsReceiptid: 1001,
    },
    {
      id: 2,
      quantityBooket: 5,
      description: "Item 2",
      articleid: "ART002",
      goodsReceiptid: 1002,
    },
    // Add more data as needed
  ];
};

const deleteGoodsReceiptPos = async (id: number): Promise<void> => {
  console.log("Delete GoodsReceiptPos with ID:", id);
  // Implement delete logic for GoodsReceiptPos
};

const editGoodsReceiptPos = async (goodsReceiptPos: GoodsReceiptPos): Promise<void> => {
  console.log("Edit GoodsReceiptPos:", goodsReceiptPos);
  // Implement edit logic for GoodsReceiptPos
};

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Goods Receipt Positions</h1>
      </div>
      <Table<GoodsReceiptPos>
        columns={goodsReceiptColumns}
        fetchData={fetchGoodsReceiptPos}
        deleteData={deleteGoodsReceiptPos}
        editData={editGoodsReceiptPos}
      />
    </>
  );
};

export default Main;
