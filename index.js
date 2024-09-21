require('dotenv').config()
const express = require('express');
const { connectDB } = require('./src/config/db');
const productsRoutes = require('./src/api/routes/products');

const app = express()
connectDB()

app.use(express.json())

app.use('/api/v1/products', productsRoutes)

app.use('*', (req, res, next) => {
    return res.status(404).json('✅ Route not found')
})

app.listen(3000, () => {
    console.log('✅ Server 🚀 http://localhost:3000');
})
