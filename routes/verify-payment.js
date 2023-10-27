import express from 'express'
import crypto from 'crypto'
import connect from '../db_connection/config.js'
const route = express.Router()

route.post('/verify-payment/:user_id', (req, res) => {

    const user_id = req.params.user_id

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const generated_signature = crypto
    .createHmac('sha256',process.env.RAZORPAY_SECRET) 
    .update(body.toString())
    .digest("hex")

    if (generated_signature === razorpay_signature) {

        connect.query('insert into orders (user_id,order_id,payment_id) values(?,?,?)',[user_id,razorpay_order_id,razorpay_payment_id],(error,response)=>{
            if(error) throw res.status(500).send({error:'something went wrong'})
        })

        res.redirect(`${process.env.CLIENT}/payment-confirmation/${'success'}/${razorpay_payment_id}`)
    }else{
        res.redirect(`${process.env.CLIENT}/payment-confirmation/${'failed'}/${razorpay_payment_id}`)
    }




})

export default route;