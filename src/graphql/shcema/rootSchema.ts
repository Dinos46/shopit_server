import { buildSchema } from "graphql";
import { authSchema } from "./authSchema";
import { itemSchema } from "./itemSchema";
import { reviewSchema } from "./reviewSchema";

export const rootSchema = buildSchema(`
    ${itemSchema}
    ${authSchema}
    ${reviewSchema}
    
    type Error {
        message:String!
    }

    type UserResponse {
        error:Error
        status:String!
        data:User
    }

    type ItemResponse {
        error:Error
        status:String!
        data:Item
    }

    type ItemsResponse {
        error:Error
        status:String!
        data:[Item]
    }
    
    type ReviewResponse {
        error:Error
        status:String!
        data:Review
    }

    type ReviewResponseDel {
        error:Error
        status:String!
        data:String
    }

    type RootMutation {
        createItem(itemInput:ItemInput):ItemResponse!
        addUser(userInput:UserInput):UserResponse!
        addReview(reviewInput:ReviewInput):ReviewResponse!
        editReview(reviewInput:ReviewInput):ReviewResponse!
        deleteReview(reviewId:String!):ReviewResponseDel!
    }

    type RootQuery {
        items(filter:FilterInput):ItemsResponse!
        item(id:ID!):ItemResponse!
        getUser(email:String!):UserResponse!
        getLogedInUser(email:String!):UserResponse!
    }

    schema {
        query:RootQuery
        mutation:RootMutation
    }
`);
