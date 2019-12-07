const express = require('express');
const UsersService = require('../services/users')

function usersAPI(app){
    const router = express.Router();
    app.use("/api/users", router)

    const usersService = new UsersService

    router.get("/", async function(req, res, next) {
        const { tags } = req.query
        try {
            res.status(200).json({
                data: await usersService.getUsers({tags}),
                message: 'Lista de usuarios enviada.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.get("/:username", async function(req, res, next) {
        const { username }  = req.params
        try {
            const user = await usersService.getUser({username})
            res.status(200).json({
                data: user,
                message: 'Datos de usuario.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.post("/", async function(req, res, next) {
        const { body: user } = req
        try {
            const createdUserId = await usersService.createUser({user})
            res.status(201).json({
                data: createdUserId,
                message: 'Usuario creado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.put("/:username", async function(req, res, next) {
        const { body: user } = req
        const { username } = req.params

        try {
            const updatedUserId = await usersService.updateUser({username, user})

            res.status(200).json({
                data: updatedUserId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:username", async function(req, res, next) {
        const { username } = req.params
        try {
            const deletedUserId  = await usersService.deleteUser({username})
            res.status(200).json({
                data: deletedUserId,
                message: 'Usuario eliminado.'
            })
        } catch (error) {
            next(error);
        }
    })

    router.patch("/:username", async function(req, res, next) {
        const { body: user } = req
        const { username } = req.params
        
        try {
            const deletedUserId  = await usersService.patchUser({username, user})
            res.status(200).json({
                data: deletedUserId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })
    //-----------------------------RASPBERRY FUNCTIONS------------------------------
    //Leer tarjeta
    router.get("/card/:cardId", async function(req, res, next) {   
        try {            
            const user = await usersService.getUserBy({card: req.params.cardId})
            res.status(200).json({
                data: user[0],
                message: `Usuario de tarjeta: ${req.params.cardId}`
            })
        } catch (error) {
            next(error);
        }
    })

    // Actualizar tarjeta
    router.put("/:userId/:cardId/transactions", async function(req, res, next) {
        const { body: data } = req
        const userId = req.params.userId        
        const cardId = req.params.cardId        
        const valueD = parseInt(data.value, 10)
        const storeD = data.store       

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        const user = await usersService.getUserBy({card: cardId})        
        let newData = {}                
        let currBalance = parseInt(user[0].balance)
        currBalance += valueD
        newData.balance = currBalance              
        
        user[0].transactions.push({value: valueD, datetime: today, store: storeD})   
        newData.transactions = user[0].transactions

        try {
            const updatedUserId = await usersService.updateUserBy(userId, newData)        
            res.status(200).json({
                data: updatedUserId,
                message: 'Usuario actualizado.'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = usersAPI