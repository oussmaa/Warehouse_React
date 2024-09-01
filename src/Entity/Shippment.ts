import Piking from "./Piking";

interface shippment {

    id:number;
    receiptDate:string;
    receiptTime:string;
    receiptAddress:string;
    receiptCity:string;
    receiptState:string;
    receiptZip:string;
    receiptCountry:string;
    receiptPhone:string;
    receiptEmail:string;
    receiptName:string;
    pickings:Piking

  }
  
  export default shippment;