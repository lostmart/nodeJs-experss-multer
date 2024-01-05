const upload = require("./multerConfig")

exports.handlePost = (req, res) => {
	upload.array("images", 3)(req, res, (err) => {
		/* if there is any error  */
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.status(400).json({
					msg: "file too big",
				})
			} else if ((err.Error = "Only jpeg, jpg and png files accepted !")) {
				return res.status(400).json({
					msg: err.Error,
				})
			} else {
				return res.status(500).json({
					msg: "Internal error",
				})
			}
		}
		const protocol = req.protocol

		const images = req.files.map((img) => {
			return `${protocol}://${req.headers.host}/images/${img.filename}`
		})
		res.status(201).json({
			msg: "Succesufully uploaded",
			images,
		})
	})
}
