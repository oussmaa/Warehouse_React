import GoodsReceiptPos from "./GoodsReceiptPos";

 
export interface GoodsReceipt {
    id: number;
    description: string;
    goodsReceiptPosid:number
    orderStockId:number
  }

  export default GoodsReceipt;