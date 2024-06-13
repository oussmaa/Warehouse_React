import React, { useEffect, useState } from 'react';
import { Table as AntdTable, Space, Button, Modal, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';

interface TableColumn<T = any> {
  title: string;
  dataIndex: keyof T;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  fetchData: () => Promise<T[]>;
  deleteData: (id: number) => Promise<void>;
  editData: (data: T) => Promise<void>;
}

const { confirm } = Modal;

function Table<T extends { id: number }>({
  columns,
  fetchData,
  deleteData,
  editData,
}: TableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<T | null>(null); // Ensure T is not nullable

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        columns.some(col =>
          String(item[col.dataIndex as keyof T])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, data, columns]);

  const handleDelete = (id: number) => {
    confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this item?',
      onOk() {
        deleteData(id).then(() => {
          setData(data.filter(item => item.id !== id));
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleEdit = (item: T) => {
    setEditItem(item);
    setEditModalVisible(true);
  };

  const handleEditOk = () => {
    if (editItem) {
      editData(editItem).then(() => {
        setEditModalVisible(false);
      });
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditItem(null);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const columnsWithActions = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: T) => (
        <Space size="middle">
          <Button type="default" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button style={{ color: 'red' }} onClick={() => handleDelete(record.id)}>
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
      <Input.Search
  placeholder="Search..."
  onSearch={handleSearch}
  enterButton
  allowClear
  style={{
    color: 'blue',
    borderColor: 'blue',
   }}
/>
      </div>
      <AntdTable columns={columnsWithActions} dataSource={filteredData} rowKey="id" />
      <Modal
        title="Edit Item"
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form
          initialValues={editItem || undefined} // Ensure editItem is not null here
          onFinish={(values: T) => {
            setEditItem({ ...editItem!, ...values });
          }}
        >
          {columns.map(col => (
            <Form.Item key={col.dataIndex as string} label={col.title} name={col.dataIndex as string}>
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
}

export default Table;
