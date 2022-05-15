import { validateRequest } from "../../services/firebaseService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const register = async (args: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: args.userInput.email as string,
        username: args.userInput.username as string,
        image: "",
      },
    });
    return { data: user, status: "" };
  } catch (err) {
    console.log(`error in register resolver`, err);
    throw new Error(`error in register resolver ${err}`);
  }
};

const logIn = async (args: any, context: any) => {
  try {
    const res = await validateRequest(context.headers);
    if (res) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (user) {
        return user;
      }
      return null;
    }
    throw new Error("not authorized");
  } catch (err) {
    console.log(`error in login resolver`, err);
    throw new Error(`error in login resolver ${err}`);
  }
};

export const getLogedInUser = async (args: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.log(`error from loged in user resolver ${err}`);
    throw new Error(`error from loged in user resolver ${err}`);
  }
};

export const authResolvers = {
  getUser: logIn,
  addUser: register,
  getLogedInUser,
};
