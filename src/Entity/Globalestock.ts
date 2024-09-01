import Article from "./Article";

export interface Globalestock {
  id: number; // Optional for new entries
   articleID: string;
  
  openingQuantity: number;
  locationArea: String  ;
  locationBin:string;
  locationPlace:string;
  reservedStock:number;
  }
  export default Globalestock;