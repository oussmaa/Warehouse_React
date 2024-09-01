interface Article {

    id:number;
    creationDate: string;
    typeArticle: string;
    description: string;
    price : number;
    articel: string;
    stocks: {
      id: number;
      creationDate: string;
      locationArea: string | null;
      locationPlace: string | null;
      openingQuantity: number;
      locationBin: string | null;
    }[];
   
  }
  
  export default Article;