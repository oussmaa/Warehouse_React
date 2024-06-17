 
  export interface TableColumn<T = any> {
    title: string;
    dataIndex: keyof T;
    render?: (record: T) => React.ReactNode;
  }

  export default TableColumn;