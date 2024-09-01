export interface GoodsReceiptPos {
    id: number; // Optional because it may not exist until saved
    quantityBooked: number;
    description: string;
    article: string;
    goodsReceiptid:number;
    location_area:string;
    location_bin:string;
    location_place:string;
  }

  export default GoodsReceiptPos;