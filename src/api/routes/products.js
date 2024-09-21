const productsRoutes = require('express').Router()
const { createListOfProducts, getProducts, getProductsByName, getProductsByPrice, updateProduct, deleteProduct } = require('../controllers/products')

productsRoutes.post('/register', createListOfProducts)
productsRoutes.get('/', getProducts)
productsRoutes.get('/getByName/:name', getProductsByName)
productsRoutes.get('/getByPrice/:price', getProductsByPrice)
productsRoutes.put('/update/:id', updateProduct)
productsRoutes.delete('/delete/:id', deleteProduct)

module.exports = productsRoutes
