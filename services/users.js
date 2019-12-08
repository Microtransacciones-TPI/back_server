const MongoLib = require('../lib/mongo')

class UsersService {
    constructor(){
        this.collection = 'users'
        this.mongoDB = new MongoLib()
    }

    async getUsers({tags}) {
        const query = tags && {tags: {$in: tags}}
        const users = await this.mongoDB.getAll(this.collection, query)
        console.log('Sending users list...');
        
        return users || []
    }

    async getUser({userId}) {
        const user = await this.mongoDB.get(this.collection, userId)
        console.log(`Sending ${userId} data...`);
        return user || {}
    }
    
    async createUser({ user }) {
        const createUserId = this.mongoDB.create(this.collection, user)
        console.log(`${user.username} created.`);
        return createUserId
    }
    
    async updateUser({username, user} = {}) {
        const updateUserId = this.mongoDB.update(this.collection, username, user)
        console.log(`${username} updated.`);
        return updateUserId
    }
    
    async deleteUser({username}) {
        const deletedUserId = this.mongoDB.delete(this.collection, username)
        console.log(`${username} deleted.`);
        return deletedUserId
    }
    
    async getUserBy(data) {
        const user = await this.mongoDB.getBy(this.collection, data)
        console.log(`Returning data...`);
        return user || {}
    }

    async updateUserBy(userId, data) {
        const user = await this.getUser({userId})
        console.log(user);
        
        const valueD = parseInt(data.value, 10)
        const storeD = data.store  

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let newData = {}                
        let currBalance = parseInt(user.balance)
        currBalance += valueD
        newData.balance = currBalance     
        
        user.transactions.push({value: valueD, datetime: today, store: storeD})   
        newData.transactions = user.transactions
        
        const updateUserId = this.mongoDB.update(this.collection, userId, newData)
        return updateUserId
    }    
}

module.exports = UsersService