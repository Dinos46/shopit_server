import { PrismaClient } from "@prisma/client";
import { EErrors, EStatus } from "../../models/respons.model";
import { validateRequest } from "../../services/firebaseService";

const prisma = new PrismaClient();

const register = async ({ userInput }: any) => {
  const { email, username } = userInput;

  try {
    if (!email && !username) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const user = await prisma.user.create({
      data: {
        email,
        username,
        image: "",
      },
    });
    return { data: user, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log(`error in register resolver`, err.data);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

const logIn = async ({ email }: any, context: any) => {
  try {
    if (!email) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const res = await validateRequest(context.headers);
    if (!res) {
      return {
        error: { message: EErrors.NOT_AUTHORIZED },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        error: { message: EErrors.NOT_FOUND },
        status: EStatus.FAILED,
        data: null,
      };
    }
    return { data: user, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log(`error in login resolver`, err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

export const getLogedInUser = async ({ email }: any) => {
  try {
    if (!email) {
      return {
        error: { message: EErrors.INVALID_INPUT },
        status: EStatus.FAILED,
        data: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        error: { message: EErrors.NOT_FOUND },
        status: EStatus.FAILED,
        data: null,
      };
    }
    return { data: user, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log(`error from loged in user resolver ${err}`);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

export const authResolvers = {
  getUser: logIn,
  addUser: register,
  getLogedInUser,
};
