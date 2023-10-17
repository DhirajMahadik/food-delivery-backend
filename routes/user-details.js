import express from 'express'
import JWT from 'jsonwebtoken'
import verifyToken from '../middlewares/verifyToken.js';
import connect from '../db_connection/config.js';
const route = express.Router()

route.post('/user-details',verifyToken, (req, res) => {
    JWT.verify(req.token, process.env.JWT_SECRET, (error, authData) => {
        if (error) res.status(400).send({ error: 'session timeout' });
        connect.query('select name,phone,email,id from users where id = ?', [authData.id], (error, response) => {
            if (error) res.status(400).send({ error: error.message.slice(0, error.message.length - 23) })
            res.send(response[0])
        })
    })

})

export default route;