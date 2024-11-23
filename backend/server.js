const express=require('express')
const cors=require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const path = require("path")


const router = require('./routes/postRoutes')


const app=express()
app.use(cors({
    origin :"http://localhost:3000" ,
    credentials : true
}))
app.use(express.json())

app.use("/api",router)

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT=5000 || process.env.PORT

connectDB().then(()=>{

    app.listen(PORT,()=>{
        console.log("connected to DB")
        console.log("Server is running")
    })

})