import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Table from "../../../base-components/Table/Table";
 import TableColumn from "../../../Entity/TableColumn";


interface User {
  id: any;
  token: string;
  type: string;
  username: string;
  email: string;
  name: string;
  locked: string;
  phone: string;
  themeid: number;
  userrole: number;
  images: string;
  address: string;
  password: string;
 }


const userColumns: TableColumn<User>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Username", dataIndex: "username" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Address", dataIndex: "address" },
  { title: "Locked", dataIndex: "locked"},
  { title: "Type", dataIndex: "type" },
  { title: "Theme ID", dataIndex: "themeid" },
  { title: "User Role", dataIndex: "userrole" },
  { title: "Images", dataIndex: "images" },
];

const fetchUsers = async (): Promise<User[]> => {
  // Replace with your fetch logic for users
  return [
    {
      id: 1,
      token: "token1",
      type: "type1",
      username: "user1",
      email: "user1@example.com",
      name: "User 1",
      locked: "false",
      phone: "123-456-7890",
      themeid: 1,
      userrole: 1,
      images: "image1",
      address: "123 Main St",
      password: "password1",
     },
    {
      id: 2,
      token: "token2",
      type: "type2",
      username: "user2",
      email: "user2@example.com",
      name: "User 2",
      locked: "true",
      phone: "987-654-3210",
      themeid: 2,
      userrole: 2,
      images: "image2",
      address: "456 Elm St",
      password: "password2",
    },
    // Add more users as needed
  ];
};

const deleteUsers = async (id: any): Promise<void> => {
  console.log("Delete user with ID:", id);
};

const editUser = async (user: User): Promise<void> => {
  console.log("Edit user:", user);
};

const Main = () => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Users</h1>
      </div>
      <Table<User>
        columns={userColumns}
        fetchData={fetchUsers}
        deleteData={deleteUsers}
        editData={editUser}
      />
    </>
  );
};

export default Main;
