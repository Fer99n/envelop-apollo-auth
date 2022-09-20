const users = []

const resolvers = {
    Mutation: {
        insertUser: (_, user) => {
            users.push(user)

            return user
        }
    },
    Query: {
        getUsers: () => {
            return users
        }
    }
}

module.exports = resolvers
