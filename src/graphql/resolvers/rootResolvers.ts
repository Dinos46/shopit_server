// import { query,getById } from "../../services/itemService";
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

//getById
const getItemById = async (args: any) => {
  const { id } = args;
  console.log('BYID', id);
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  console.log('BYID', item);
  return item;
};

//get all items in db
const getAllItems = async () => {
  const items = await prisma.item.findMany();
  console.log('FIND', items);
  return items;
};

export const rootResolvers = {
  getItemById,
  getAllItems,
};
