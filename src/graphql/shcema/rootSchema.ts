import { buildSchema } from "graphql";
import { authSchema } from "./authSchema";
import { itemSchema } from "./itemSchema";
import { reviewSchema } from "./reviewSchema";

export const rootSchema = buildSchema(`
    ${itemSchema}
    ${authSchema}
    ${reviewSchema}
    
type RootQuery {
    items(filter:FilterInput): [Item]!
    item(id:ID!):Item
    getUser(email:String!):User
    getLogedInUser(email:String!):User
}

type RootMutation {
    createItem(itemInput:ItemInput):String!
    addUser(userInput:UserInput):User!
    addReview(reviewInput:ReviewInput):String
    editReview(reviewInput:ReviewInput):String
    deleteReview(reviewId:String!):String
}

schema {
    query:RootQuery
    mutation:RootMutation
}
`);
