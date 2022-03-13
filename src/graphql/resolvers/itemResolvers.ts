import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

//getById
//@ts-ignore
const getItemById = async (args: any, context: any) => {
  const { id } = args;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  return item;
};

//get all items in db
const getAllItems = async ({ filter }: any) => {
  const ctg = filter?.ctg || undefined;
  const name = filter?.name || undefined;
  const maxPrice = +filter?.maxPrice || undefined;
  const minPrice = +filter?.minPrice || undefined;

  try {
    if (ctg || name || maxPrice || minPrice) {
      console.log("FIND WITH ARGUMENTS");
      const items = await prisma.item.findMany({
        include: {
          reviews: true,
        },
        where: {
          category: {
            equals: ctg,
            mode: "insensitive",
          },
          title: {
            contains: name,
            mode: "insensitive",
          },
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });
      return items;
    }
    console.log("FIND WITHOUT ARGUMENTS");
    const items = await prisma.item.findMany({
      include: { reviews: true },
    });

    return items;
  } catch (err) {
    console.log(`error in get all items resolver`);
    throw new Error(`error in get all items resolver ${err}`);
  }
};

export const itemResolvers = {
  item: getItemById,
  items: getAllItems,
};
