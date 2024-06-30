import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import Users from "../../../Entity/Users";

const { Option } = Select;

const Main: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId as number | undefined;
  const [initialValues, setInitialValues] = useState<Partial<Users>>({});
  const [initialPassword, setInitialPaswword] = useState<string>();

  const buttonBackground = {
    background: "#4CAF50",
    color: "#fff",
  };

  useEffect(() => {
    if (userId) {
      apiService.getUser(ApiUrls.GETUSERBYID, userId).then((data: any) => {
        // Transforming roles and permissions to the expected format
        const transformedData = {
          ...data,
          roleNames: data.roles
            ? data.roles.map((role: any) => role.roles)
            : [],
          permissionNames: data.permissions
            ? data.permissions.map((perm: any) => perm.code)
            : [],
        };
        setInitialValues(transformedData);
        setInitialPaswword(transformedData.password)
         form.setFieldsValue(transformedData);
      });
    }
  }, [userId]);

  const onFinish = async (values: any) => {
    try {
      // Transforming back roles and permissions to the original format for submission
      const transformedValues = {
        ...values,
        roles: values.roleNames.map((role: string) => ({ roles: role })),
        permissions: values.permissionNames.map((perm: string) => ({
          code: perm,
        })),
      };

if(initialPassword==transformedValues.password)
  {
    transformedValues.password ="";
  }
         if (userId) {
 
        console.log(transformedValues);
        await apiService.EditUser(ApiUrls.USERAPI + userId, transformedValues);
      } 
     navigate("/dashboard/listusers");
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
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input the password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="locked" valuePropName="checked" label="Locked">
        <Checkbox />
      </Form.Item>
      <Form.Item
        name="roleNames"
        label="Role Names"
        rules={[{ required: true, message: "Please input the role names!" }]}
      >
        <Select mode="tags" style={{ width: "100%" }} placeholder="Roles">
          <Option value="Admin">Admin</Option>
          <Option value="User">User</Option>
          {/* Add other roles as needed */}
        </Select>
      </Form.Item>
      <Form.Item
        name="permissionNames"
        label="Permissions"
        rules={[{ required: true, message: "Please input the permissions!" }]}
      >
        <Select mode="tags" style={{ width: "100%" }} placeholder="Permissions">
          <Option value="INSERT">INSERT</Option>
          <Option value="DELETE">DELETE</Option>
          <Option value="UPDATE">UPDATE</Option>

          {/* Add other permissions as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={buttonBackground} htmlType="submit">
          {userId ? "Update User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Main;
