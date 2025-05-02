//import tools from node
import express, {Request, Response, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'
import {Server} from 'socket.io'
import http from 'http'
//import files
import config from './config'
import errorHandelMiddleware from './middleware/error.handel.middleware'
import routes from './routes'
import upload from './upload/uploadImg'
import sendMail from './send_email/index'
import uploadFile from './upload/uploadFile'

const app: Application = express()
const port = config.port || 3000

app.use(morgan('common'))
app.use(express.json())
app.use(cookieParser())

app.use(
	cors({
		credentials: true,
		optionsSuccessStatus: 200,
		methods: '*',
		origin: ['http://localhost:3000'],
	})
)

app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use('/api', routes)

app.get('/healthz', (_req: Request, res: Response) => {
	res.send({status: 'ok✌️'})
})

app.post('/upload', upload.array('image', 10), (req: any, res) => {
	const fileNames = (req.files as Express.Multer.File[]).map(
		(file) => file.filename
	)
	res.send(fileNames)
})
app.post(
	'/upload/file',
	uploadFile.array('file', 10),
	(req: any, res: Response) => {
		const fileNames = (req.files as Express.Multer.File[]).map(
			(file) => file.filename
		)
		res.send(fileNames)
	}
)

app.use('/uploads', express.static('uploads'))

app.get('/image/:filename', (req, res) => {
	const {filename} = req.params
	res.sendFile(req.params.filename, {
		root: path.join(__dirname, '/uploads/image'),
	})
})

app.get('/file/:filename', (req, res) => {
	const {filename} = req.params
	res.sendFile(req.params.filename, {
		root: path.join(__dirname, '/uploads/file'),
	})
})
app.post('/ver', (req: Request, res: Response) => {
	sendMail(req.body.email, req.body.username), res.json({message: 'Email send'})
})

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', 'http://localhost:3001'],
		methods: ['GET', 'POST'],
	},
})
io.on('connection', (socket) => {
	console.log('🔌 Connected socket id:', socket.id)
	socket.on('add_request', () => {
		io.emit('all_com')
	})
	socket.on('disconnect', () => {
		console.log('🔌 Disconnected socket id:', socket.id)
	})
})
server.listen(port, () => {
	console.log(`server is start with port :${port}`)
})

app.use(errorHandelMiddleware)
