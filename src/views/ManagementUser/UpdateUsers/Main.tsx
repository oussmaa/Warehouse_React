import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import Users from "../../../Entity/Users";
import { any, number } from "prop-types";

const { Option } = Select;

const Main: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId as number | undefined;
  const [initialValues, setInitialValues] = useState<Partial<Users>>({});
  const buttonBackground = {
    background: "#4CAF50", // Change this to any color or dynamic value
    color: "#fff", // Text color
  };
  useEffect(() => {
    console.log("befor user id -------------- : ", userId)
    if (userId) {
      console.log("befor user id -------------- : ")
      // Fetch user data based on userId and set initial values
      console.log("id of user =>> " + JSON.stringify(userId));
      apiService.getUser(ApiUrls.GETUSERBYID, userId).then((data:any) => {
        console.log("user data from update profile : " + JSON.stringify(data));
        setInitialValues(data);
        form.setFieldsValue(data);
      });
    }
  }, [userId]);

  const onFinish = async (values: Users) => {
    console.log(JSON.stringify(values))
    try {
      if (userId) {
        await apiService.EditUser(ApiUrls.USERAPI + userId, values);
      } else {
        await apiService.createUser(ApiUrls.CREATEUSER, values);
      }
      message.success("User updated successfully");
      navigate("/dashboard/users");
    } catch (error) {
      message.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input the username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="adress"
        label="Address"
        rules={[{ required: true, message: "Please input the address!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="themeid"
        label="Theme ID"
        rules={[{ required: true, message: "Please input the theme ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userrole"
        label="User Role"
        rules={[{ required: true, message: "Please select the user role!" }]}
      >
        <Select>
          <Option value={1}>Admin</Option>
          <Option value={13}>User</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="locked"
        valuePropName="checked"
        label="Locked"
      >
        <Checkbox />
      </Form.Item>
 
      <Form.Item
        name={["rolesRequest", "descrption"]}
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input />
        
      </Form.Item>
      <Form.Item
        name={["rolesRequest", "permissions"]}
        label="Permissions"
        rules={[{ required: true, message: "Please input the permissions!" }]}
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Permissions">
          <Option value="READ">READ</Option>
          <Option value="WRITE">WRITE</Option>
          <Option value="Delete">Delete</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" style={buttonBackground} htmlType="submit">
          { "Update User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Main;
