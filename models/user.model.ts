import db from '../database/index'
import User from '../types/user.types'
import bcrypt from 'bcrypt'
import config from '../config'

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as unknown as string, 10)
	return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
	//create user
	async create(u: User): Promise<User> {
		try {
			//open connect with DB1
			const connect = await db.connect()
			const checkUsername = await connect.query(
				'SELECT username FROM users WHERE username=($1)',
				[u.username]
			)
			if (checkUsername.rows.length) {
				throw new Error(`username already exists! `)
			}
			const sql =
				'INSERT INTO users ( username, access, password, salary) values ($1, $2, $3, $4) returning *'
			//run query
			const result = await connect.query(sql, [
				u.username,
				u.access,
				hashPassword(u.password),
				u.salary,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`username already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all users
	async getAll(): Promise<User[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users'
			//run query
			const result = await connect.query(sql)
			if (result.rows.length === 0) {
				throw new Error(`no users found! `)
			}
			//release connect
			connect.release()
			//return created user
			return result.rows
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
	//get specific user
	async getOne(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			if (result.rows.length === 0) {
				throw new Error(`no user found! `)
			}
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	async getOneFromUserName(username: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'SELECT * from users WHERE username=($1)'
			//run query
			const result = await connect.query(sql, [username])
			if (result.rows.length === 0) {
				throw new Error(`no user found! `)
			}
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${username}, ${err}`)
		}
	}
	//update user
	async update(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET username=$1, access=$2,  password=$3, salary=$4  WHERE id=$5 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.username,
				u.access,
				hashPassword(u.password),
				u.salary,

				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.username}, ${err}`)
		}
	}
	//delete user
	async delete(id: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = 'DELETE from users  WHERE id=($1) RETURNING *'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not delete  user ${id}, ${err}`)
		}
	}
	//authenticate user
	async auth(username: string, password: string): Promise<User | null> {
		try {
			const connect = await db.connect()
			const sql = `SELECT password FROM users WHERE username=$1`
			const res = await connect.query(sql, [username])
			if (res.rows.length) {
				const {password: hashPassword} = res.rows[0]
				const isPassValid = bcrypt.compareSync(
					`${password}${config.pepper}`,
					hashPassword
				)
				if (isPassValid) {
					const userInfo = await connect.query(
						`SELECT * FROM users WHERE username=($1)`,
						[username]
					)
					return userInfo.rows[0]
				}
			}
			connect.release()
			return null
		} catch (err) {
			throw new Error(`${err}`)
		}
	}
}
export default UserModel
