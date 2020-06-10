const {Client} = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'password',
    database: 'postapp'
})

let createDb = () => {
    client.connect()

    return client.query('CREATE DATABASE postapp')
}

let fetchDb = () => {
    return client.query('SELECT NOW()')
}

module.exports = {
    createDb: createDb,
    fetchDb: fetchDb
}