export interface IReview {
  id: string;
  title: string;
  body: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  itemId: string;
}

export interface IReviewInput {
  id?: string;
  title: string;
  body: string;
  rating: string;
  itemId?: string;
  userId: string;
}
