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

const login = async (args: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  } catch (err) {
    console.log(`error in login resolver`);
    throw new Error(`error in login resolver ${err}`);
  }
};

export const authResolvers = {
  user: login,
  addUser: register,
};
