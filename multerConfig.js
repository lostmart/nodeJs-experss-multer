const multer = require("multer")
const path = require("path")

// Set up the storage for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images") // Images will be stored in the 'images' directory
	},
	filename: (req, file, cb) => {
		// console.log(file.mimetype)
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		cb(null, file.fieldname + "-" + uniqueSuffix + extension)
	},
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024, // 1 MB limit per file
	},
})

module.exports = upload
