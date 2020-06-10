const knex = require('../database');
const bcrypt = require('bcrypt');

class UserController{

    async index(req,res){
        knex('users').select().returning('*').then(data => {
            return res.json(data)
        })
    }

    async create(req,res){
        bcrypt.genSalt(async (err,salt) => {
            const serializedBody = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, salt)
            }
    
            knex.insert(serializedBody).into('users').returning('*').then( data =>{
                return res.json({validation: true, salt: salt, data: data})
            }).catch(err => {
                console.log(err)
                return res.json({error: err, validation: false})
            })
        })
    }

    async show(req,res){
        console.log(req.body)
        const body = req.body
        knex('users').where({username: body.username}).first().returning('*').then( data => {
            if(!data){
                res.json({message: "No Username '" + body.username + "' Found!", exists: false})
            }
            else{
                bcrypt.compare(body.password, data.password, (err, same) => {
                    res.json({message: `Password match is ${same}`,match: same, exists: true, error: err, data: data})
                })
            }
        })
    }
};

module.exports = UserController;