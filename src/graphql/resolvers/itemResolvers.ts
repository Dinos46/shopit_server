import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

//getById
const getItemById = async (args: any) => {
  console.log("FIND BY ID");
  const { id } = args;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
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
          reviews: {
            include: {
              user: true,
            },
          },
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
    const items = await prisma.item.findMany({
      include: {
        reviews: {
          include: { user: true },
        },
      },
    });
    console.log("FIND WITHOUT ARGUMENTS");

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
