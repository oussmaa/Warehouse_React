export interface GoodsReceiptPos {
    id: number; // Optional because it may not exist until saved
    quantityBooket: number;
    description: string;
    articleid: string;
    goodsReceiptid:number;
  }

  export default GoodsReceiptPos;