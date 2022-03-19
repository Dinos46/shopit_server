import { IItem } from "./item.model";
import { IReview } from "./review.model";

export interface IUser {
  id?: string;
  email: string;
  username: string;
  role: Role;
  image?: string;
  cart?: ICART[] | [];
  token?: string;
  createdAt: string;
  updatedAt: string;
  reviews: IReview[] | [];
}

enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface ICART {
  id: string;
  quantity: number;
  item: IItem | string;
}
