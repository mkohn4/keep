const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type ToDo {
        _id: ID
        toDoId: String
        text: String
        created_at: Date
    }

    type Done {
        _id: ID
        doneId: String
        text: String
        created_at: Date
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
        saveBook(authors:[String], description: String!, bookId: String!, title: String!, image: String, link: String): User
        removeBook(bookId: String!): User
    }
`
module.exports = typeDefs;