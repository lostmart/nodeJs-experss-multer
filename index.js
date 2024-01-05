const path = require("path")
const express = require("express")
const app = express()
const port = 3000

const userController = require('./postController')



// Endpoint to handle file uploads
app.post("/upload", userController.handlePost)

app.use("/images", express.static(path.join(__dirname, "images")))

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
