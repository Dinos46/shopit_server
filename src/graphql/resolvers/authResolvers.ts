import { PrismaClient } from "@prisma/client";
import { auth } from "../../services/firebaseService";

const prisma = new PrismaClient();

const _validateRequest = async (headers: any) => {
  if (!headers["authorization"]) {
    return null;
  }
  const token = headers["authorization"].split(" ")[1];
  const idToken = await auth.verifyIdToken(token);
  // console.log("headers", idToken);
  return idToken;
};

const register = async (args: any) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: args.userInput.email as string,
        username: args.userInput.username as string,
        image: "",
        
      },
    });
    return user;
  } catch (err) {
    console.log(`error in login resolver`);
    throw new Error(`error in login resolver ${err}`);
  }
};

const logIn = async (args: any, context: any) => {
  // console.log("context.headers", context.headers);
  try {
    const isValid = await _validateRequest(context.headers);
    if (isValid) {
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

export const authResolvers = {
  getUser: logIn,
  addUser: register,
};
