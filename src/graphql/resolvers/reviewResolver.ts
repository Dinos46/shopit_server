import { PrismaClient } from "@prisma/client";
import { EErrors, EStatus } from "../../models/respons.model";
import { validateRequest } from "../../services/firebaseService";

const prisma: PrismaClient = new PrismaClient({
  log: ["info", "query"],
});

const addReview = async ({ reviewInput }: any, context: any) => {
  const email = await validateRequest(context.headers);
  const { body, rating, title, itemId, userId } = reviewInput;
  console.log(reviewInput);
  try {
    if (!email) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
    if (!body && !title && !itemId && !userId) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
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
    console.log(review);
    return { data: review, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log("error in add resolver", err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

const editReview = async ({ reviewInput }: any, context: any) => {
  const email = await validateRequest(context.headers);
  const { id, body, rating, title, userId } = reviewInput;
  try {
    if (!email) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
    if (!body && !title && userId && !rating) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (user?.id !== userId) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
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
    return { data: res, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log("error in edit resolver", err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

const deleteReview = async ({ reviewId }: any, context: any) => {
  const email = await validateRequest(context.headers);
  try {
    if (!email) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
    if (!reviewId) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const res = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { user: true },
    });
    if (res?.user.email !== email) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    return {
      data: `review with id: ${reviewId} was deleted`,
      status: EStatus.SUCCESS,
      error: null,
    };
  } catch (err) {
    console.log("error in delete resolver", err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

export const reviewResolver = {
  addReview,
  editReview,
  deleteReview,
};
