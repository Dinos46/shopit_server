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

    input FilterInput {
        ctg: String
        minPrice:Int
        maxPrice:Int
        name:String
    }

    type RootQuery {
        items(filter:FilterInput): [Item]!
        item(id:ID!):Item!
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
