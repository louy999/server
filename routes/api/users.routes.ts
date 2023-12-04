import {Router, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config'
import UserModel from '../../models/user.model'
const userModel = new UserModel()

const routes = Router()

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
//create
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
routes.get('/email/:email', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.getOneFromEmail(
			req.params.email as unknown as string
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
routes.patch('/:id', async (req: Request, res: Response, next) => {
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
routes.patch('/img/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.updateImgUser(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/balance/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.updateBalance(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/win/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.updateWin(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/pass/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.updatePass(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/tree/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await userModel.updateTree(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
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
routes.post('/auth', async (req: Request, res: Response, next) => {
	try {
		const {email, password} = req.body
		const user = await userModel.auth(email, password)
		const token = jwt.sign({user}, config.tokenSecret as unknown as string)
		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'the username and password do not match please try agin',
			})
		}
		res.cookie('accessToken', token, {
			httpOnly: true,
		})

		res.json({
			status: 'success',
			data: {...user},
			message: 'user auth successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.post('/logout', async (req: Request, res: Response, next) => {
	res
		.clearCookie('accessToken', {
			secure: true,
			sameSite: 'none',
		})
		.status(200)
		.json('user has been logout')
})

export default routes
