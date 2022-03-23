import { buildSchema } from "graphql";
import { authSchema } from "./authSchema";
import { itemSchema } from "./itemSchema";

export const rootSchema = buildSchema(`
    ${itemSchema}
    ${authSchema}
    
type RootQuery {
    items(filter:FilterInput): [Item]!
    item(id:ID!):Item
    getUser(email:String!):User
}

type RootMutation {
    createItem(itemInput:ItemInput):String!
    addUser(userInput:UserInput):User!
}

schema {
    query:RootQuery
    mutation:RootMutation
}
`);
