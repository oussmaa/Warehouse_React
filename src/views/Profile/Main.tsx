import {
  Lucide,
  TabGroup,
} from "@/base-components";
import apiService from "@/Service/ApiService";
import ApiUrls from "@/API/apiUrls";
import Users from "../../Entity/Users";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

function Main() {
  const [UserState, setUserState] = useState<Partial<Users>>({});
  const [initialPassword, setInitialPassword] = useState<string>();
  const [form] = Form.useForm();

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please input the password!"));
    }

    if (value.length < 8) {
      return Promise.reject(new Error("Password must be at least 8 characters long!"));
    }

    if (!/[A-Z]/.test(value)) {
      return Promise.reject(new Error("Password must contain at least one uppercase letter!"));
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(new Error("Password must contain at least one special character!"));
    }

    return Promise.resolve();
  };

  const GetUserWithToken = async () => {
    try {
      let token = localStorage.getItem('token');
      const userdata = await apiService.GetUserProfiles(ApiUrls.GETUSERWITHTOKEN, token);
      setUserState(userdata);
       setInitialPassword(userdata.password);
      form.setFieldsValue(userdata); // Set form fields with the fetched user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    GetUserWithToken();
  }, []);

  const onFinish = async (values: any) => {
    try {
      const transformedValues = {
        ...values,
      };

      if (initialPassword === transformedValues.password) {
        transformedValues.password = "";
      }

      console.log(transformedValues);
      // Uncomment the line below to send the update request to your API
       await apiService.EditUser(ApiUrls.USERAPI + UserState?.id, transformedValues);

      message.success("Profile updated successfully");
      // navigate("/dashboard/profile"); // Uncomment to navigate to a different page after update
    } catch (error) {
      message.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Profile Layout</h2>
      </div>
      <TabGroup>
        {/* BEGIN: Profile Info */}
        <div className="intro-y box px-5 pt-5 mt-5">
          <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
            <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  style={{ width: '400px' }}
                  src={`http://localhost:7070/login/images/${UserState?.images}`}
                />
              </div>
              <div className="ml-5">
                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  {UserState?.name}
                </div>
                <div className="text-slate-500"> {UserState?.username}</div>
              </div>
              <div className="ml-5">
                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  Role
                </div>
                <div className="text-slate-500"> {UserState?.roles}</div>
              </div>
              <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                Permission
              </div>
              {
                UserState?.permissions?.map((perm:any, index) => (
                  <div key={index} className="text-slate-500" style={{ marginBottom: '10px' }}>
                    <p>{perm.code}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  </div>
                ))
              }
            </div>
            <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Contact Details
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                <div className="truncate sm:whitespace-normal flex items-center">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {UserState?.email}
                </div>
                <div className="truncate sm:whitespace-normal flex items-center mt-3">
                  <Lucide icon="Phone" className="w-4 h-4 mr-2" />
                  {UserState?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END: Profile Info */}

        {/* BEGIN: Profile Update Form */}
        <div className="intro-y box px-5 pt-5 mt-5">
          <div className="font-medium text-center lg:text-left lg:mt-3">
            Update Profile
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={UserState}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please input the username!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input disabled />
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
              name="password"
              label="Password"
       rules={[
          {
            validator: validatePassword,
          },
        ]}            >
              <Input.Password />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: "#4CAF50", color: "#fff" }}>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* END: Profile Update Form */}
      </TabGroup>
    </>
  );
}

export default Main;
