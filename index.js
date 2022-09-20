const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServer } = require('apollo-server')
const { envelop, useSchema } = require('@envelop/core')
const { useOperationFieldPermissions } = require('@envelop/operation-field-permissions')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const { getUserPermissions } = require('./src/schema/permissions')

const executableSchema = makeExecutableSchema({ typeDefs, resolvers })

const getEnveloped = envelop({
    plugins: [
        useSchema(executableSchema),
        useOperationFieldPermissions({
            getPermissions: getUserPermissions
        })
    ]
})

const apolloServer = new ApolloServer({
    schema: executableSchema,
    executor: async (requestContext) => {
        let isAuthenticated = false

        const token = requestContext.request.http.headers.get('Authorization')

        if (token === 'example-token') isAuthenticated = true

        const { schema, execute, contextFactory } = getEnveloped({
            req: requestContext.request.http,
            isAuthenticated
        })

        return execute({
            schema,
            document: requestContext.document,
            contextValue: await contextFactory(),
            variableValues: requestContext.request.variables,
            operationName: requestContext.operationName
        })
    },
    introspection: true
})

apolloServer.listen({ port: 4000 }).then((serverInfo) => console.log(`Server running on ${serverInfo.url}`))
