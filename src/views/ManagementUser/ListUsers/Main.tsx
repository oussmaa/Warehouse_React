import React, { useEffect, useState } from "react";
import Table from "../../../base-components/Table/Table";
import TableColumn from "../../../Entity/TableColumn";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import TableUser from "../../../base-components/Table/TableUser";
import { Navigation, useNavigate } from "react-router-dom";

interface User {
  id: any;
  token: string;
 
  username: string;
  email: string;
  name: string;
  locked: boolean;
  phone: string;
  themeid: number;
  userrole: number;
  images: string;
  adress: string;
  password: string;
}
const userColumns: TableColumn<User>[] = [
  { title: "ID", dataIndex: "id" },
  { title: "Name", dataIndex: "name" },
  { title: "Username", dataIndex: "username" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Address", dataIndex: "adress" },
  { title: "Theme ID", dataIndex: "themeid" },
 
 
];

const fetchUsers = async (): Promise<User[]> => {
  try {
    const userList = await apiService.GetListUsers(ApiUrls.GETALLUSERS);
    return userList;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const deleteUsers = async (id: any): Promise<void> => {
  console.log("Delete user with ID:", id);
};




 

const Main = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (error) {
        setError("Error fetching users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    return users;
  };

  const handleNavigate = async (id:number) : Promise<void> => {
    navigation("/dashboard/updateusers", {state : {userId : id}});
  }


  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">List Of Users</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TableUser<User>
              columns={userColumns}
              fetchData={fetchData}
              deleteData={deleteUsers} 
              navigateTo={(id : number)=>{handleNavigate(id)}}
        />
      )}
    </>
  );
};

export default Main;
