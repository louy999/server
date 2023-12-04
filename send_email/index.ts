import nodemailer from 'nodemailer'
const sendMail = (email: any, number: any) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: '',
			pass: '',
		},
	})
	transporter.sendMail(
		{
			from: ``,
			to: email,
			subject: ``,
			html: ``,
		},
		(err: any, info: any) => {
			if (err) throw err
		}
	)
}
export default sendMail
