// const connectDb = require('./models/testdb')
// const db = require('./models/createdb')
const dbInit = require('./models/createdb')
// let create_output =  connectDb.createDb()
// let fetch_output = connectDb.fetchDb()

// create_output.then(res=>{console.log(res)}).catch(err=>{console.log(err)})
// fetch_output.then(res=> {console.log(res)}).catch(err=>{console.log(err)})
// let db_test = db.createdb()

// db_test.then(res=>{
//     console.log('Everything Fine')
//     db.endClient()
// }).catch(err => {
//     console.log('Database Already Exists!\n',err.stack)
//     db.endClient()
// })

const setup = (async function(){
    let result = await dbInit.createdb()

    if (result.create){
        console.log('Database Created Successfuly.')
    }

    else{
        console.log('Nothing Was Done in Setup.')
    }

    dbInit.endClient()
})()

module.exports = setup