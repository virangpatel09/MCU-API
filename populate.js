require('dotenv').config()

const connectDB = require('./db/connect')
const Schema = require('./models/schema')
const jsonCharacter = require('./MCUcharaternew.json')

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Schema.deleteMany()
        await Schema.create(jsonCharacter)
        await console.log('success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()