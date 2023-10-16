import express from 'express'

const route = express.Router()

route.get('/get-key', (req, res) => {
        res.send({key:process.env.RAZORPAY_KEY})
})

export default route;