const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        name: String
        email: String
    }
    type Mutation {
        insertUser(name: String!, email: String): User!
    }
    type Query {
        getUsers: [User]!
    }
`

module.exports = typeDefs
