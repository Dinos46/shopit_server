import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

//getById
const getItemById = async (args: any, context: any) => {
  console.log('FIND', context);
  const { id } = args;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  return item;
};

//get all items in db
//@ts-ignore
const getAllItems = async (args: any, context: any) => {
  console.log('FIND WITH ARGUMENTS', context);
  if (args.filter) {
    //@ts-ignore
    const { ctg, maxPrice, minPrice, name } = args.filter;
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
  console.log('FIND NO ARGUMENTS');
  const items = await prisma.item.findMany();
  return items;
};

export const rootResolvers = {
  item: getItemById,
  items: getAllItems,
};
