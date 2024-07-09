interface OrderPosition{
    id?: number,
    orderId : number,
    articel : string,
    quantity : number,
    description : string,
    locationArea : string,
    locationBin : string,
    loactionPlace : string
}

export default OrderPosition;