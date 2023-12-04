import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT as string, 10),
	database: process.env.DB_DATABASE,
	user: process.env.DB_DATABASE_USER,
	password: process.env.DB_DATABASE_PASS,
	max: 250,
})

pool.on('error', (error: Error) => {
	console.log(error)
})

export default pool
