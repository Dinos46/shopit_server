"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolvers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getItemById = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('FIND', context);
    const { id } = args;
    const item = yield prisma.item.findUnique({
        where: {
            id,
        },
    });
    return item;
});
const getAllItems = (args, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.filter) {
        console.log('FIND WITH ARGUMENTS');
        const { ctg, maxPrice, minPrice, name } = args.filter;
        const items = yield prisma.item.findMany({
            where: {
                category: {
                    equals: ctg || '',
                    mode: 'insensitive',
                },
                title: {
                    contains: name || '',
                    mode: 'insensitive',
                },
            },
        });
        return items;
    }
    console.log('FIND NO ARGUMENTS');
    const items = yield prisma.item.findMany();
    return items;
});
exports.rootResolvers = {
    item: getItemById,
    items: getAllItems,
};
//# sourceMappingURL=rootResolvers.js.map