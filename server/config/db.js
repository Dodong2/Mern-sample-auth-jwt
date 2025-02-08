const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log(`Connected to the Database!`)
    } catch (err) {
        console.log('Failed to connect to the Database! : ', err)
    }
}

module.exports = connectDB