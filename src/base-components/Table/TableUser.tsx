import React, { useEffect, useState } from "react";
import { Table as AntdTable, Space, Button, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TableColumn from "../../Entity/TableColumn";

interface TableProps<T> {
  columns: TableColumn<T>[];
  fetchData: () => Promise<T[]>;
  deleteData: (id: number) => Promise<void>;
  navigateTo?: (id : number) => void;
 
}

const { confirm } = Modal;

function TableUser<T extends { id: number }>({
  columns,
  fetchData,
  deleteData,
  navigateTo
}: TableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [editItem, setEditItem] = useState<T | null>(null);

  const [form] = Form.useForm();

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
      okType: 'danger', // This sets the button type to be red
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

  const handleEdit = (item: number) => {
    console.log("from handle edit : " + item);
    if(navigateTo){
      navigateTo(item);
    }
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columnsWithActions = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: T) => (
        <Space size="middle">
     
          <Button type="default" onClick={() => handleEdit(record.id)}>
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
    </div>
  );
}

export default TableUser;
