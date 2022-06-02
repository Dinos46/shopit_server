import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { rootSchema } from "./graphql/shcema/rootSchema";
import { itemResolvers } from "./graphql/resolvers/itemResolvers";
import { authResolvers } from "./graphql/resolvers/authResolvers";
import { reviewResolver } from "./graphql/resolvers/reviewResolver";

const isProd = process.env.NODE_ENV === "production";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    rootValue: { ...itemResolvers, ...authResolvers, ...reviewResolver },
    graphiql: {
      headerEditorEnabled: true,
    },
  })
);

app.get("/", (_, res: express.Response) => {
  res.send("shopit fake store");
});

const PORT = process.env.PORT || 5000;
const urlStr = isProd ? `` : `http://localhost:${PORT}/graphql`;
app.listen(PORT, () => console.log(`server is running on ${urlStr}`));
