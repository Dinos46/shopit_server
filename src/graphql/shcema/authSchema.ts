export const authSchema = `
    
    type User {
        id:ID!
        email:String!
        username:String!
        image:String
    }

    input UserInput {
        email:String!
        username:String!
        image:String   
    }
`;
