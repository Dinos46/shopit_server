import { PrismaClient } from "@prisma/client";
import { EErrors, EStatus } from "../../models/respons.model";

const prisma: PrismaClient = new PrismaClient();

const getItemById = async (args: any) => {
  const { id } = args;
  try {
    if (!id) {
      return {
        error: { message: EErrors.OPERATION_FAILED },
        status: EStatus.FAILED,
        data: null,
      };
    }
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
    if (!item) {
      return {
        error: { message: EErrors.NOT_FOUND },
        status: EStatus.FAILED,
        data: null,
      };
    }
    return { data: item, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log("error in get item by id", err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

const getAllItems = async ({ filter }: any) => {
  const ctg = filter?.ctg || undefined;
  const name = filter?.name || undefined;
  const maxPrice = +filter?.maxPrice || undefined;
  const minPrice = +filter?.minPrice || undefined;

  try {
    if (ctg || name || maxPrice || minPrice) {
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
      return { data: items, status: EStatus.SUCCESS, error: null };
    }
    const items = await prisma.item.findMany({
      include: {
        reviews: {
          include: { user: true },
        },
      },
    });

    return { data: items, status: EStatus.SUCCESS, error: null };
  } catch (err) {
    console.log(`error in get all items resolver`, err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

export const itemResolvers = {
  item: getItemById,
  items: getAllItems,
};
