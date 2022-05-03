export const reviewSchema = `
    
    type Review {
        id:ID!
        title:String!
        body:String!
        createdAt:String!
        updatedAt:String!
        userId:String
        itemId:String
        user: User!
        rating: Float!
    }
`;
