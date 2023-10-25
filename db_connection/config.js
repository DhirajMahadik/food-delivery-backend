import mysql from 'mysql2'
import env from 'dotenv'
env.config()

const connect = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD
})

// database details for your reference 

    // Tables = food_app_users , food_app_orders
    
    // columns in tables = {
    //     users = id, name, phone, email, password
    //     orders = user_id, order_id, payment_id
    // }

export default connect;