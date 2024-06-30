export interface GoodsReceiptPos {
    id: number; // Optional because it may not exist until saved
    quantityBooket: number;
    description: string;
    article: string;
    goodsReceiptid:number;
    location_area:string
  }

  export default GoodsReceiptPos;