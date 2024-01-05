const multer = require("multer")
const path = require("path")

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
}

const fileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
		return cb(new Error("Only jpeg, jpg, webp and png files accepted !"))
	}
}

// Set up the storage for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images") // Images will be stored in the 'images' directory
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		//const extension = path.extname(file.originalname)
		const extensionTwo = MIME_TYPES[file.mimetype]
		// console.log(extensionTwo)
		fileFilter(req, file, cb)

		cb(null, file.fieldname + "-" + uniqueSuffix + "." + extensionTwo)
	},
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024, // 1 MB limit per file
	},
})

module.exports = upload
