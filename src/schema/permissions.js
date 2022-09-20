const getUserPermissions = (context) => {
    const permissionsSet = new Set()

    permissionsSet.add('User.*')
    permissionsSet.add('Mutation.insertUser')

    if (context.isAuthenticated) permissionsSet.add('Query.getUsers')

    return permissionsSet
}

module.exports = {
    getUserPermissions
}
