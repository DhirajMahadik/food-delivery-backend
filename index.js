import express from 'express';
import connect from './db_connection/config.js'; 
import env from 'dotenv';
import cors from 'cors'
import Razorpay from 'razorpay';

// controllers
import loginHandler from './routes/login.js';
import paymentHandler from './routes/make-payment.js';
import getKeyHandler from './routes/get_key.js';
import verifyPaymentHandler from './routes/verify-payment.js';
import userDetailsHandler from './routes/user-details.js';

env.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:'true'}))
app.use(cors({
    origin:process.env.CLIENT,
    methods:['GET','POST','DELETE','PUTE']
}))

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
 
app.use('/api/auth',loginHandler)
app.use('/api',paymentHandler)
app.use('/api',getKeyHandler)
app.use('/api',verifyPaymentHandler)
app.use('/api',userDetailsHandler)

connect.connect((error)=>{
    if(error) throw error;
    app.listen(process.env.PORT,()=>{
        console.log("Server is running")
    })
})