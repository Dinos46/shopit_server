export interface IItem {
  id?: string;
  image: string;
  price: number;
  title: string;
  category: string;
  description: string;
}

export interface IItemInput {
  id?: string;
  image?: string;
  price?: number;
  title?: string;
  category?: string;
  description?: string;
}

export interface IFilter {
  filter: {
    ctg?: string;
    price?: number;
    name?: string;
  };
}

export type Args = IFilter | string | {} | IItemInput;
