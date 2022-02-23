import * as cors from 'cors';
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from './graphql/shcema/itemSchema';
import { rootResolvers } from './graphql/resolvers/rootResolvers';

const app = express();
app.use(express.json());

// if (process.env.NODE_ENV !== 'production') {
//   const corsOptions = {
//     origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true,
//   };
// }
app.use(cors());

// app.use((req: express.Request, _, next: express.NextFunction) => {
//   req.body.user = 'dino';
//   next();
// });

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: { ...rootResolvers },
    // false in production
    // graphiql: process.env.NODE_ENV !== 'production',
    graphiql: {
      headerEditorEnabled: true,
    },
  })
);

app.get('/**', (_, res: express.Response) => {
  res.send('shopit fake store');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
