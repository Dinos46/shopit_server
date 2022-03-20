import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { itemResolvers } from "./graphql/resolvers/itemResolvers";
import { authResolvers } from "./graphql/resolvers/authResolvers";
import { rootSchema } from "./graphql/shcema/rootSchema";

const app = express();
app.use(express.json());

// if (process.env.NODE_ENV !== 'production') {
//   const corsOptions = {
//     origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true,
//   };
// }
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: rootSchema,
    rootValue: { ...itemResolvers, ...authResolvers },
    // false in production
    // graphiql: process.env.NODE_ENV !== 'production',

    graphiql: {
      headerEditorEnabled: true,
    },
  })
);

app.get("/**", (_, res: express.Response) => {
  res.send("shopit fake store");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is running on port http://localhost:${PORT}`)
);
