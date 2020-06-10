const knex = require('../database');
const requestIp = require('request-ip')

class RoomController{

    async index(req,res){
        const rooms = await knex('rooms').select();
        return res.json(rooms);
    }

    async create(req,res){
        const serializedBody = {
            ...req.body,
            ip: await requestIp.getClientIp(req).split(':').slice(-1).pop()
        }

        knex.insert(serializedBody).into('rooms').returning('*').then( data => {
            return res.json({message: 'Success!',data: data, status: true});
        }).catch(err => {
            console.log(err)
            return res.json({message: `Error creating Room with IP ${serializedBody.ip}`, error: err, status: false});
        })
    }

    async update(req,res){
        knex('rooms').update(req.body).where({ip: req.body.ip}).returning('*').then( data => {
            return res.json({message: 'success!', data: data, status: true});
        }).catch(err => {
            return res.json({message: 'Failed to Start Game', error: err, status: false})
        })
    }

    async delete(req,res){
        const ip = await requestIp.getClientIp(req).split(':').slice(-1).pop();
        knex('rooms').where({ip: ip}).del().then( data => {
            res.json({message: 'Room Removed.', success: true});
        }).catch(err => {
            res.json({message: 'Failed to remove room.', error: err, success: false});
        })
    }
}

module.exports = RoomController