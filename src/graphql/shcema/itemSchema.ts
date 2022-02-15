import { buildSchema } from 'graphql';

export const graphqlSchema = buildSchema(
  `
    type Item {
        id: ID!
        image:String!
        price: Float!
        title: String!
        category: String!
        description: String!
    }

    input ItemInput {
        id: ID
        image:String
        price: Float!
        title: String
        category: String
        description: String
    }

    type RootQuery {
        getAllItems: [Item!]!
        getItemById(id:ID!):Item!
       
    }

    type RootMutation {
        createItem(itemInput:ItemInput):String!
    }
    
    schema {
        query:RootQuery
        mutation:RootMutation
    }
    `
);
