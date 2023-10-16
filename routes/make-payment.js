import express from 'express'
import { instance } from '../index.js'
const route = express.Router()

route.post('/make-payment', (req, res) => {
    console.log(req.body)
    const options = {
        amount: Number(req.body.cost * 100),  // amount in the smallest currency unit
        currency: "INR"
    };
    instance.orders.create(options, function (err, order) {
        if(err)throw err
        console.log(order);
        res.send(order)
    });

})

export default route;

