const express = require('express')
const router = express.Router()
const requestIp = require('request-ip')
const bcrypt = require('bcrypt')
const db = require('../../database')


router.get('/', (req,res) => {
    const ipFromRequest = requestIp.getClientIp(req).split(':').slice(-1).pop()
    db.select().from('todo').orderBy('id').then(function(data){
        res.send({ip: ipFromRequest, data: data})
    })
})

router.get('/user', (req,res) =>{
    db.select().from('password').where({username: req.body.username}).first().returning('*').then(data => {
        if(!data){
            res.send({message: "No username " + req.body.username})
        }
        else{
            bcrypt.compare(req.body.password, data.password, (err,same) => {
                res.send({passwordCheck: same, error: err})
            })
        }    
    }).catch(err => {
        res.send(err)
    })
})

router.get('/ip', (req,res) => {
    res.send({ip: req.connection.remoteAddress})
})

router.post('/register', (req,res) =>{
    bcrypt.genSalt(async (err,salt) => {
        const insertData = {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, salt)
        }
    // INSERT INTO tablename(column1,column2) VALUES(columns1_value,columns2_value);    
        db.insert(insertData).into('password')
        .returning('*').then(data => { //RETURN SELECT * FROM table WHERE id = inserted_row;
            res.send({salt: salt, data: data})
        }).catch(err => {
            console.log(err)
            res.send(err)
        })
    })
})

router.post('/', (req,res) => {
    db.insert(req.body).into('todo').returning('*').then(data =>{
        res.send(data)
    })
})

router.patch('/:id', (req,res) => {
    db('todo').where({ id: req.params.id}).update(req.body).returning('*').then(data => {
        res.send(data)
    }) //SELECT * FROM todo WHERE id = ourId
})

router.put('/:id', (req,res) => {
    db('todo').where({ id: req.params.id}).update(
        {
            title: req.body.title || null,
            is_done: req.body.is_done || null
        }).returning('*').then(data => {
        res.send(data)
    }) //SELECT * FROM todo WHERE id = ourId
})

router.delete('/:id', (req,res) => {
    db('todo').where({id: req.params.id}).del().then(() => {
        res.json({sucess: true})
    })
})

router.get('/:id', (req,res) => {
    db('todo').where({id: req.params.id}).select().then(data => {
        res.send(data)
    })
})



module.exports = router