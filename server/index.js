require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParcer = require('cookie-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/auth')
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'https://samplepost.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(cookieParcer())


const PORT = process.env.PORT || 5000

connectDB()

//routes
app.use('/auth', authRoutes)
app.use('/auth', postRoutes)

app.listen(PORT, () => {
    console.log(`running on port: ${PORT}`)
})

