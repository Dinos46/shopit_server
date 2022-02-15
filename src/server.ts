import * as path from 'path';
import * as cors from 'cors';
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from './graphql/shcema/itemSchema';
import { rootResolvers } from './graphql/resolvers/rootResolvers';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: { ...rootResolvers },
    // false in production
    graphiql: process.env.NODE_ENV !== 'production',
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
