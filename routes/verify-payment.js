import express from 'express'
import crypto from 'crypto'
const route = express.Router()

route.post('/verify-payment', (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const generated_signature = crypto
    .createHmac('sha256',process.env.RAZORPAY_SECRET) 
    .update(body.toString())
    .digest("hex")

    if (generated_signature === razorpay_signature) {
        res.status(200).json({
            status: 'success',
        })
    }else{
        res.status(200).json({
            status: 'failed',
        })
    }




})

export default route;