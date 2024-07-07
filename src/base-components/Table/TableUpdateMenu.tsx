import React, { useEffect, useState } from "react";
import { Table as AntdTable, Space, Button, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TableColumn from "../../Entity/TableColumn";
import { useLocation, useNavigate } from "react-router-dom";
import path from "path";

interface TableProps<T> {
  columns: TableColumn<T>[];
  fetchData: () => Promise<T[]>;
  deleteData: (id: number) => Promise<void>;
  editData: (data: T) => Promise<void>;
  navigateTo?: (path: string, state?: any) => void;
}

const { confirm } = Modal;

function TableUpdateMenu<T extends { id: number }>({
  columns, 
  fetchData,
  deleteData,
  editData,
  navigateTo
}: TableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<T | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        columns.some((col) =>
          String(item[col.dataIndex as keyof T])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, data, columns]);

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue(editItem);
    }
  }, [editItem, form]);

  const handleDelete = (id: number) => {
    confirm({
      title: "Confirm Delete",
      okType: "danger",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this item?",
      onOk() {
        deleteData(id).then(() => {
          setData(data.filter((item) => item.id !== id));
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEdit = (item: T) => {
    setEditItem(item);
    setEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      const updatedItem = { ...editItem!, ...values };
      editData(updatedItem).then(() => {
        setEditModalVisible(false);
        setEditItem(null);
        setData(
          data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
      });
    });
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditItem(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRowClick = (record: T) => { 
    const menuId = record.id; // Assuming record.id is the menuId you want to pass
     if (navigateTo) {
     navigateTo('',{ menuId }); // Replace '/your-path' with your actual route
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: T) => (
        <Space size="middle">
           <Button type="default" onClick={() => handleRowClick(record)}>
            Display Sub  
          </Button>   
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            style={{ color: "red" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ] as ColumnsType<T>;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <Input
          placeholder="Search..."
          onChange={handleSearch}
          allowClear
          style={{
            color: "blue",
            borderColor: "blue",
          }}
        />
      </div>
      <AntdTable
        columns={columnsWithActions}
        dataSource={filteredData}
        rowKey="id"
    
      />
      <Modal
        title="Edit Item"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        footer={[
          <Button key="cancel" onClick={handleEditCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={handleEditOk}
          >
            OK
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={editItem || undefined}
          onFinish={(values) => {
            setEditItem({ ...editItem!, ...values });
          }}
        >
          {columns.map((col) => (
            <Form.Item
              key={col.dataIndex as string}
              label={col.title}
              name={col.dataIndex as string}
              rules={[
                {
                  required: true,
                  message: `Please input ${col.title}!`,
                },
              ]}
            >
              {col.dataIndex === "id" ? <Input disabled /> : <Input />}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
}

export default TableUpdateMenu;
