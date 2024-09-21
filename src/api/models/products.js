const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
}, {
    timestamps: true,
    collection: 'products',
})

const Products = mongoose.model('products', productSchema, 'products')

module.exports = Products