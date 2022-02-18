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
    console.log('FIND', ctg);
    const items = await prisma.item.findMany({
      where: {
        category: {
          equals: ctg || '',
          mode: 'insensitive',
        },
        title: {
          contains: name || '',
          mode: 'insensitive',
        },
        // AND: {
        //   price: {
        //     gte: +minPrice,
        //     lte: +maxPrice,
        //   },
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
