const {
    gql
} = require('apollo-server-express');

const typeDefs = gql `
    scalar Date

    type User {
        _id: ID
        username: String
        email: String
        toDo: [ToDo]
    }

    type ToDo {
        _id: ID
        text: String
        done: Boolean
        createdAt: Date
        updatedAt: Date
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!):  Auth
        addToDo(text: String!): User
        removeToDo(_id: String!): User
    }
`

module.exports = typeDefs;