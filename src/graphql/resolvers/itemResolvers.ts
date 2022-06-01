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
  const query = _buildFilter(filter);
  try {
    if (!query) {
      const items = await prisma.item.findMany({
        include: {
          reviews: {
            include: { user: true },
          },
        },
      });

      return { data: items, status: EStatus.SUCCESS, error: null };
    }
    const items = await _getFiltered(query);

    return items;
  } catch (err) {
    console.log(`error in get all items resolver`, err);
    return {
      error: { message: EErrors.OPERATION_FAILED },
      status: EStatus.FAILED,
      data: null,
    };
  }
};

const _getFiltered = async (filter: any) => {
  console.log("first", filter);
  try {
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
          equals: filter.ctg,
          mode: "insensitive",
        },
        title: {
          contains: filter.name,
          mode: "insensitive",
        },
        price: {
          gte: filter.minPrice,
          lte: filter.maxPrice,
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

const _buildFilter = (filter: any) => {
  if (!filter) return null;
  const obj = {} as any;
  Object.keys(filter).forEach((key) => {
    if (filter[key]) {
      obj[key] = filter[key];
    }
  });
  console.log("OBj", obj);
  return obj;
};

export const itemResolvers = {
  item: getItemById,
  items: getAllItems,
};
