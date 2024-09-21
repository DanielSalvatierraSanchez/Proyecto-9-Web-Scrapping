const mongoose = require('mongoose')
const Products = require('../api/models/products')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        // await Products.collection.drop()
        console.log('✅ BBDD connected!!!')
    } catch (error) {
        console.log('❌ Error en la conexión de la BBDD')
    }
}

module.exports = { connectDB }
