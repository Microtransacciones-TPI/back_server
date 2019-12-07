const express = require('express')
const app = express()

const {config} = require('./config/index')
const usersAPI = require('./routes/users.js')


// body parser
app.use(express.json());
usersAPI(app);

app.listen(config.port)
console.log('Listening from:', config.port);
