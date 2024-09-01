import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Select, message } from 'antd';
import axios from 'axios';
 import Piking from '../../../Entity/Piking';
import ApiService from '../../../Service/ApiService';
import { useNavigate } from 'react-router-dom';
import ApiUrls from "@/API/apiUrls";

const { Option } = Select;

function Main() {

    const navigate = useNavigate();

  const [form] = Form.useForm();
  const [pickings, setPickings] = useState<Piking[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickings = async () => {
      try {
        const response = await ApiService.GetListOrder(ApiUrls.GetListPickingNotShippment);
        setPickings(response);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load picking orders');
        setLoading(false);
      }
    };

    fetchPickings();
  }, []);

  const handleFinish = async (values: any) => {
    const shipmentData = {
      ...values,
      receiptDate: values.receiptDate.format('YYYY-MM-DD'),
      receiptTime: values.receiptTime.format('HH:mm:ss'),
    };
    console.log(shipmentData)
    try {
        await ApiService.AddShipmment(ApiUrls.AddShipmment, shipmentData);
       navigate("/dashboard/listshipmment");
      } catch (error) {
        console.error("Error adding supplier:", error);
      }

     //form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
    <Form.Item
  name="picking"
  label="Select Picking"
  rules={[{ required: true, message: 'Please select at least one picking order' }]}
>
  <Select
    mode="multiple"
    placeholder="Select picking orders"
    loading={loading}
    disabled={loading}
    allowClear
  >
    {pickings?.map((picking) => (
      <Option key={picking.id} value={picking.id}>
        {picking.name}
      </Option>
    ))}
  </Select>
</Form.Item>

      <Form.Item
        name="receiptName"
        label="Receipt Name"
        rules={[{ required: true, message: 'Please enter the recipient\'s name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptAddress"
        label="Receipt Address"
        rules={[{ required: true, message: 'Please enter the receipt address' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptCity"
        label="Receipt City"
        rules={[{ required: true, message: 'Please enter the city' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptState"
        label="Receipt State"
        rules={[{ required: true, message: 'Please enter the state' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptZip"
        label="Receipt Zip Code"
        rules={[{ required: true, message: 'Please enter the zip code' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptCountry"
        label="Receipt Country"
        rules={[{ required: true, message: 'Please enter the country' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptPhone"
        label="Receipt Phone"
        rules={[{ required: true, message: 'Please enter the phone number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptEmail"
        label="Receipt Email"
        rules={[
          { required: true, message: 'Please enter the email address' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="receiptDate"
        label="Receipt Date"
        rules={[{ required: true, message: 'Please select the receipt date' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="receiptTime"
        label="Receipt Time"
        rules={[{ required: true, message: 'Please select the receipt time' }]}
      >
        <TimePicker format="HH:mm:ss" />
      </Form.Item>

      <Form.Item>
        <Button type="dashed" htmlType="submit">
          Add Shipment
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Main;
