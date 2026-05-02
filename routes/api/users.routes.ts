import {Router, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import UserModel from '../../models/user.model'
const userModel = new UserModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.create(req.body)
		res.json({
			status: 'success',
			data: {...user},
			message: 'user created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//get all
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.getAll()
		res.json({
			status: 'success',
			data: user,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
//get specific user
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: user,
			message: 'user retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
//get specific user by username
routes.get('/username/:username', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.getOneFromUserName(
			req.params.username as unknown as string
		)
		res.json({
			status: 'success',
			data: user,
			message: 'user retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
//update user
routes.patch('/', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.update(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
//delete user
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: user,
			message: 'user deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})
//authenticate user
routes.post('/auth', async (req: Request, res: Response, next) => {
	try {
		const {phone, password} = req.body
		const user = await userModel.auth(phone, password)
		// const token = jwt.sign({user}, config.tokenSecret as unknown as string)
		res.json({
			status: 'success',
			data: {...user},
			message: 'user auth successfully',
		})
	} catch (err) {
		next(err)
	}
})
export default routes
