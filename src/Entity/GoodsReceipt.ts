import GoodsReceiptPos from "./GoodsReceiptPos";

 
export interface GoodsReceipt {
    id: number;
    description: string;
    goodsReceiptPosid:number
    orderStockid:number
  }

  export default GoodsReceipt;