import express from 'express'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connect from '../db_connection/config.js'
import env from 'dotenv'
env.config()

const route = express.Router()

route.post('/login', (req, res) => {
    try {
        const email = req.body.email;
        let query = 'Select password, id from food_app_users where email = ?'
        connect.query(query, [email], async (error, response) => {
            if (error) res.status(500).send({ error: 'some error occurs' });
            if (response.length !== 0) {
                let pass = await bcrypt.compare(req.body.password, response[0].password);
                if (pass) {
                    let id = response[0].id
                    JWT.sign({ id }, process.env.JWT_SECRET, (error, token) => {
                        if (error) res.status(500).send({ error: 'some error occurs' });
                        res.send({ token })
                    })
                } else {
                    res.status(404).send({ error: 'Invalid user credential' })
                }
            } else {
                res.status(404).send({ error: 'User not found' })
            }

        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post('/register', (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        bcrypt.hash(password, 2, (err, hash) => {
            if (err) res.status(500).send({ error: 'some error occurs' });
            connect.query('insert into food_app_users(name,phone,email,password) values(?,?,?,?)', [name, phone, email, hash], (error, response) => {
                if (error) res.status(500).send({ error: error.message })
                res.send(response)
            })
        })

    } catch (error) {
        res.send(error)
    }
})

export default route