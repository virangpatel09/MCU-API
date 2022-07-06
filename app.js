const express=require("express")
const routes=require("./routes/mcu")
const connectDB=require("./db/connect")
const asyncWrapper = require("./middleware/async")
const app=express()
require('dotenv').config()
const notfound = require("./middleware/not-found")
const errorHandler = require("./middleware/error")
const cors = require('cors')

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use("/api/v1/characters",routes)
app.use(notfound)
app.use(errorHandler)

const port = process.env.PORT || 3000;
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start()
