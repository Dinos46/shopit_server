"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const express_graphql_1 = require("express-graphql");
const itemSchema_1 = require("./graphql/shcema/itemSchema");
const rootResolvers_1 = require("./graphql/resolvers/rootResolvers");
const app = express();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    };
    app.use(cors(corsOptions));
}
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: itemSchema_1.graphqlSchema,
    rootValue: Object.assign({}, rootResolvers_1.rootResolvers),
    graphiql: true,
    context: () => {
        return { user: 'dino' };
    },
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
//# sourceMappingURL=server.js.map