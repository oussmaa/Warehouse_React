import Article from "./Article";

export interface Globalestock {
    id: number; // Optional for new entries
    quantityUsed: number;
    article: Article;
    openingQuantity: number;
  }
  export default Globalestock;