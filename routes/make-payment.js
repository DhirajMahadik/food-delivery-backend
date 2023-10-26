import express from 'express'
import { instance } from '../index.js'
const route = express.Router()

route.post('/make-payment', (req, res) => {
    const options = {
        amount: Number(req.body.cost * 100),
        currency: "INR"
    };
    instance.orders.create(options, function (err, order) {
        if (err) throw res.status(500).send({error:'payment order is not created'})
        res.send(order)
    });

})

export default route;

