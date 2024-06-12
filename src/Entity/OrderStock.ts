import Supplier from "./Supplier";

export interface OrderStock {
    id: number;
    orderStockNb: number;
    description: string;
    quantityNeeded: number;
    supplier: Supplier;
  }

  export default OrderStock;