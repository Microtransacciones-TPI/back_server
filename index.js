const os = require('os')
const express = require('express')
const app = express()

const {config} = require('./config/index')
const usersAPI = require('./routes/users.js')

// body parser
app.use(express.json());
usersAPI(app);


app.listen(config.port, function () {
    console.log('IPs de la maquina:')
    let nics = os.networkInterfaces()
    for (let i in nics) console.log('\t', nics[i][0].address);
    console.log('Puerto:', config.port);        
})