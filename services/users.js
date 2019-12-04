const usersMock = require ('../utils/mocks/users')

class UsersService {
    async getUsers() {
        const users = usersMock
        return users || []
    }

    async getUser() {
        const user = usersMock.users[0]
        return user || {}
    }

    async createUser() {
        const createUserId = usersMock.users[0].id
        return createUserId
    }

    async updateUser() {
        const updateUserId = usersMock.users[0].id
        return updateUserId
    }

    async deleteUser() {
        const deletedUserId = usersMock.users[0].id
        return deletedUserId
    }

    async patchUser() {
        const patchedUserId = usersMock.users[0].id
        return patchedUserId
    }
}

module.exports = UsersService