const upload = require("./multerConfig")

exports.handlePost = (req, res) => {
	upload.single("images", 3)(req, res, (err) => {
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.status(400).json({
					msg: "file too big",
				})
			} else {
				return res.status(500).json({
					msg: "Internal error",
				})
			}
		}

		const image = req.file.filename
		const protocol = req.protocol
		const imageUrl = `${protocol}://${req.headers.host}/images/${image}`
		res.status(201).json({
			msg: "Image updloaded",
			image: imageUrl,
		})
	})
}

// (req, res, function (err) {
//             if (err instanceof multer.MulterError) {
//                 // A Multer error occurred when uploading.
//                 if (err.code === "LIMIT_FILE_SIZE") {
//                     return res.status(400).send("File size exceeds the limit (5 MB).")
//                 }
//                 return res.status(500).send("Internal Server Error")
//             }

//             // Files are stored in the 'images' directory
//             // Access them using req.files
//             res.send("Images uploaded successfully!")
//         })
