const express = require("express")
const multer = require("multer")
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

const app = express()
app.get("/",function(req,res){
    console.log("running on 3000")
    res.send("hey")
})
app.post("/api",upload.single("file"),function(req,res){
    res.json(req.file)
})
app.listen(3000,()=>{
    console.log("connected")
})