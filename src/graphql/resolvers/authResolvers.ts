import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (args: any) => {
  const user = await prisma.user.create({
    data: {
      email: args.userInput.email,
      username: args.userInput.username,
    },
  });
  return user;
};

const getCurrentUser = async (args: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });
    console.log(user);
    return user;
  } catch (err) {
    console.log(`error in login resolver`);
    throw new Error(`error in login resolver ${err}`);
  }
};

export const authResolvers = {
  user: getCurrentUser,
  addUser: register,
};
