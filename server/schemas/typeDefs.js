const {
    gql
} = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        toDo: [ToDo]
        done: [Done]
    }

    type ToDo {
        _id: ID
        text: String
        createdAt: String
    }

    type Done {
        _id: ID
        text: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

`
// type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!):  Auth
//     saveBook(authors:[String], description: String!, bookId: String!, title: String!, image: String, link: String): User
//     removeBook(bookId: String!): User
// }
module.exports = typeDefs;