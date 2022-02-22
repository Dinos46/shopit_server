import { IItem } from './itemModel';

export interface IUser {
  id?: string;
  email: string;
  username: string;
  role: string;
  image?: string;
  cart?: IItem[] | [];
  token?: string;
}
