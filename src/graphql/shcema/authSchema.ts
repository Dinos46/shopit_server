export const authSchema = `
    
    type User {
        id:ID!
        email:String!
        username:String!
        image:String
        role:Roles!
        cart:[CartItem]
        createdAt:String!
        updatedAt:String!
    }


    type CartItem {
        id:ID!
        quantity:Int!
        item:Item!
        itemId:String!
    }

    input UserInput {
        email:String!
        username:String!
        image:String   
    }

    enum Roles {
        admin
        user
      }
`;
