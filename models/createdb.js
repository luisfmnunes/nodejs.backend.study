const {Client} = require('pg')


const dbManager = (function() {
    const config = {
        host: 'localhost',
        port: 5432,
        user: 'admin',
        password: 'password',
        database: 'postgres'
    }
    const client = new Client(config)

    return{
        createdb: function(name = 'database'){
            client.connect()

            return client.query('CREATE DATABASE ' + name)
            .then((res) => {
                console.log('Database ' + name + ' Created.')
                return {create: true, result: res}
            }).catch(err => {
                console.log('Database ' + "'" + name + "'" + ' Already Exists')
                return {create: false, error: err}
            })
        },

        endClient: () => {client.end()},
    }
})();

module.exports = dbManager