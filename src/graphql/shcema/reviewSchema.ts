export const reviewSchema = `
    
    type Review {
        id:ID!
        title:String!
        body:String!
        createdAt:String!
        updatedAt:String!
        userId:String!
        itemId:String!
        user: User!
        rating: String! 
    }

    input ReviewInput {
        id:ID
        title:String!
        body:String!
        rating: String!
        itemId:String!
        userId:String! 
    }
`;
