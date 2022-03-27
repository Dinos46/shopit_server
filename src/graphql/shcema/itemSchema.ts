export const itemSchema = `

    type Item {
        id: ID!
        image:String!
        price: Float!
        title: String!
        category: String!
        description: String!
        reviews: [Review!]
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
    `;
