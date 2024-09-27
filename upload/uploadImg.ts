import express, {Request, Response, Application} from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/image')
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.originalname + '-' + Date.now() + path.extname(file.originalname)
		)
	},
})

const uploadImg = multer({
	storage,
	fileFilter: (req, file, cb) => {
		// Allow only image files
		if (!file.mimetype.startsWith('image/')) {
			return cb(new Error('Only image files are allowed!') as any, false)
		}
		cb(null, true)
	},
})

// const uploadImg = multer({storage})

export default uploadImg
