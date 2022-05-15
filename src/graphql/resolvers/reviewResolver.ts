import { validateRequest } from "../../services/firebaseService";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const addReview = async ({ reviewInput }: any, context: any) => {
  const email = await validateRequest(context.headers);
  try {
    if (email) {
      const { body, rating, title, itemId, userId } = reviewInput;
      const review = await prisma.review.create({
        data: {
          body,
          rating,
          title,
          itemId,
          userId,
        },
        include: { user: true },
      });
      return review;
    }
    throw new Error("must be logged in");
  } catch (err) {
    console.log("error in add resolver", err);
    throw new Error(`error in add resolver`);
  }
};

const editReview = async ({ reviewInput }: any, context: any) => {
  const email = await validateRequest(context.headers);
  const { id, body, rating, title } = reviewInput;
  try {
    if (email) {
      const res = await prisma.review.update({
        where: {
          id,
        },
        data: {
          body,
          rating,
          title,
        },
        include: { user: true },
      });
      console.log(res);
      return res;
    }
    return;
  } catch (err) {
    console.log("error in edit resolver", err);
    throw new Error(`error in edit resolver ${err}`);
  }
};

const deleteReview = async ({ reviewId }: any, context: any) => {
  const email = await validateRequest(context.headers);
  try {
    if (email) {
      const res = await prisma.review.findUnique({
        where: { id: reviewId },
        include: { user: true },
      });
      if (res?.user.email === email) {
        await prisma.review.delete({
          where: {
            id: reviewId,
          },
        });
        return `review with the id: ${reviewId} was deleted`;
      }
    }
    return;
  } catch (err) {
    console.log("error in delete resolver", err);
    throw new Error(`error in delete resolver ${err}`);
  }
};

export const reviewResolver = {
  addReview,
  editReview,
  deleteReview,
};
