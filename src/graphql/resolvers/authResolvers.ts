import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (args: any) => {
  console.log(args);
};

// const login = async () => {};

export const authResolvers = {
  //   user: login,
  addUser: register,
};
