// import { query,getById } from "../../services/itemService";
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

//getById
const getItemById = async (args: any) => {
  const { id } = args;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  console.log('BYID', item);
  return item;
};

//get all items in db
const getAllItems = async (args: any) => {
  const { ctg, maxPrice, minPrice, name } = args.filter;
  if (ctg || maxPrice || minPrice || name) {
    console.log('FIND', name);
    const items = await prisma.item.findMany({
      where: {
        category: {
          contains: ctg || '',
          mode: 'insensitive',
        },
        price: {
          lte: +maxPrice || Infinity + 0.1,
          gte: +minPrice || 0.0,
        },
        // title: {
        //   contains: name || '',
        //   mode: 'insensitive',
        // },
      },
    });
    return items;
  }
  const items = await prisma.item.findMany();
  return items;
};

export const rootResolvers = {
  item: getItemById,
  items: getAllItems,
};
