import dotenv from 'dotenv'
dotenv.config()

const {
	PORT,
	DB_HOST,
	DB_PORT,
	DB_DATABASE,
	DB_DATABASE_TEST,
	DB_DATABASE_USER,
	DB_DATABASE_PASS,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
	TOKEN_SECRET,
} = process.env
export default {
	port: PORT,
	host: DB_HOST,
	dbPort: DB_PORT,
	database: DB_DATABASE,
	user: DB_DATABASE_USER,
	pass: DB_DATABASE_PASS,
	pepper: BCRYPT_PASSWORD,
	salt: SALT_ROUNDS,
	tokenSecret: TOKEN_SECRET,
}
