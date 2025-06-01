// Import necessary modules
const express = require("express")
const multer = require("multer")

// Set up custom storage configuration for Multer
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  // Files will be saved in the 'uploads' folder
  },
  // Define how the uploaded file should be named
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // Create a unique identifier
    cb(null, file.fieldname + '-' + uniqueSuffix)  // Format: fieldname-uniqueSuffix
  }
})

// Create an upload instance with the defined storage settings
const upload = multer({ storage: storage })

// Initialize the Express application
const app = express()

// Root GET route for testing server availability
app.get("/", function(req, res) {
  console.log("running on 3000")  // Log to the console
  res.send("hey")  // Respond to the browser
})

// POST route to handle single file uploads
// 'file' refers to the name of the field in the form-data
app.post("/api", upload.single("file"), function(req, res) {
  res.json(req.file)  // Return the uploaded file's info as JSON
})

// Start the server on port 3000
app.listen(3000, () => {
  console.log("connected")  // Log that the server is running
})
