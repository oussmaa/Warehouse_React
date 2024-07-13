import LocationArea from "./LocationArea";
import LocationBin from "./LocationBin";
import LocationPlace from "./LocationPlace";

interface OrderPosition {
  id?: number;
  orderId: number;
  article: string;
  quantity: number;
  description: string;
  locationArea: string 
  locationBin: string 
  locationPlace: string 
}

export default OrderPosition;
