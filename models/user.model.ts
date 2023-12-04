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
			const sql =
				'INSERT INTO users ( username, email, number, password, imgprofile, balance, idNF, idNB, statusAccess, win ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *'
			//run query
			const result = await connect.query(sql, [
				u.username,
				u.email,
				u.number,
				hashPassword(u.password),
				u.imgprofile === '' ? 'image-1687075732968.png' : u.imgprofile,
				u.balance === '' ? 0 : u.balance,
				u.idNF,
				u.idNB,
				u.statusAccess === '' ? 'user' : u.statusAccess,
				u.win === '' ? '0' : u.win,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err: any) {
			// throw new Error(`email already exists! `)
			throw new Error(`${err} `)
		}
	}
	//get all users
	async getAll(): Promise<User[]> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT id, username, email, number	, imgprofile, balance, idNF, idNB, statusAccess, tree, win from users'
			//run query
			const result = await connect.query(sql)
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
			const sql =
				'SELECT id, username, email, number, imgprofile, balance, idNF, idNB, statusAccess, bundleName, bundleId, tree, win from users WHERE id=($1)'
			//run query
			const result = await connect.query(sql, [id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${id}, ${err}`)
		}
	}
	async getOneFromEmail(email: string): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql =
				'SELECT id, username, email, number, imgprofile, balance, idNF, idNB, statusAccess, bundleName, bundleId, win from users WHERE email=($1)'
			//run query
			const result = await connect.query(sql, [email])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`.could not find user ${email}, ${err}`)
		}
	}
	//update user

	async update(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET email=$1, username=$2,  number=$3, imgprofile=$4 , bundleName=$5, bundleId=$6 , statusAccess=$7 WHERE id=$8 RETURNING *`
			//run query
			const result = await connect.query(sql, [
				u.email,
				u.username,
				u.number,
				u.imgprofile,
				u.bundleName,
				u.bundleId,
				u.statusAccess,
				u.id,
			])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}

	async updateImgUser(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  imgprofile=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.imgprofile, u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}
	async updateBalance(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  balance=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.balance, u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}
	async updateWin(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  win=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.win, u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.email}, ${err}`)
		}
	}
	async updatePass(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  password=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [hashPassword(u.password), u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user , ${err}`)
		}
	}
	async updateTree(u: User): Promise<User> {
		try {
			//open connect with DB
			const connect = await db.connect()
			const sql = `UPDATE users SET  tree=$1  WHERE id=$2 RETURNING *`
			//run query
			const result = await connect.query(sql, [u.tree, u.id])
			//release connect
			connect.release()
			//return created user
			return result.rows[0]
		} catch (err) {
			throw new Error(`could not update  user ${u.tree}, ${err}`)
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
	async auth(email: string, password: string): Promise<User | null> {
		try {
			const connect = await db.connect()
			const sql = `SELECT password FROM users WHERE email=$1`
			const res = await connect.query(sql, [email])
			if (res.rows.length) {
				const {password: hashPassword} = res.rows[0]
				const isPassValid = bcrypt.compareSync(
					`${password}${config.pepper}`,
					hashPassword
				)
				if (isPassValid) {
					const userInfo = await connect.query(
						`SELECT id, email, username, number, imgprofile, balance, idNF, idNB, statusAccess, bundleName, bundleId FROM users WHERE email=($1)`,
						[email]
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
