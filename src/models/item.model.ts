import { IReview } from "./review.model";

export interface IItem {
  id?: string;
  image: string;
  price: number;
  title: string;
  category: string;
  description: string;
  reviews: IReview[];
}
