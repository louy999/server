import express, {Request, Response, Application} from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname + '-' + Date.now() + path.extname(file.originalname)
		)
	},
})

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Allow only image files
		if (!file.mimetype.startsWith('image/')) {
			return cb(new Error('Only image files are allowed!') as any, false)
		}
		cb(null, true)
	},
})

// const upload = multer({storage})

export default upload
