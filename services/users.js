const MongoLib = require('../lib/mongo')

class UsersService {
    constructor(){
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }
    async getUsers({tags}) {
        const query = tags && {tags: {$in: tags}}
        const users = await this.mongoDB.getAll(this.collection, query)
        return users || []
    }

    async getUser({username}) {
        const user = await this.mongoDB.get(this.collection, username)
        return user || {}
    }

    async createUser({ user }) {
        const createUserId = this.mongoDB.create(this.collection, user)
        return createUserId
    }

    async updateUser({username, user} = {}) {
        const updateUserId = this.mongoDB.update(this.collection, username, user)
        return updateUserId
    }

    async deleteUser({username}) {
        const deletedUserId = this.mongoDB.delete(this.collection, username)
        return deletedUserId
    }

    async patchUser() {
        const patchedUserId = this.mongoDB.patchUser
        return patchedUserId
    }
}

module.exports = UsersService