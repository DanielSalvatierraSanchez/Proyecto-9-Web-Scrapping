const Products = require('../models/products')
const productsJSON = require('../../../products.json')

const createListOfProducts = async (req, res, next) => {
    try {
        await Products.collection.drop()
        await Products.insertMany(productsJSON)

        if (!productsJSON) {
            return res.status(400).json({
                message: '👎🏽 No hay ningún producto en la BBDD',
                productsJSON
            })
        }
        return res.status(201).json({
            message: '✅ Juegos insertados en la BBDD 🚀',
            productsJSON
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador createListOfProducts => ',
            error
        })
    }
}

const getProducts = async (req, res, next) => {
    try {
        const allProducts = await Products.find()

        if (!allProducts.length) {
            return res.status(400).json({
                message:
                    '👎🏽 No hay ningún producto 💡 Primero crea la lista de lod productos.'
            })
        }
        return res.status(200).json({
            message: '📝 Listado de todos los productos: ',
            allProducts
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador getProducts => ',
            error
        })
    }
}

const getProductsByName = async (req, res, next) => {
    try {
        const { name } = req.params
        const productByName = await Products.find({
            name: new RegExp(name, 'i')
        })

        if (!productByName.length) {
            return res.status(400).json({
                message:
                    '👎🏽 No hay ningún producto con ese nombre o no esta creada la lista de los productos.'
            })
        }
        return res.status(200).json({
            message: `📝 Listado de todos los productos que contengan ${name} : `,
            productByName
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador getProductsByName => ',
            error
        })
    }
}

const getProductsByPrice = async (req, res, next) => {
    try {
        const { price } = req.params
        const productByPrice = await Products.find({ price: { $lte: price } })

        if (!productByPrice.length) {
            return res.status(400).json({
                message: `👎🏽 No se ha encontrado ningún producto por menos de ${price}€ o no esta creada la lista de los productos.`
            })
        }
        return res.status(200).json({
            message: `📝 Listado de todos los productos que no superen ${price}€ : `,
            productByPrice
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador getProductsByPrice => ',
            error
        })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const { image, price } = req.body

        if (image) {
            if (!image.startsWith('https://')) {
                return res.status(400).json({
                    message:
                        '⛔ Debes de introducir una URL de una imagen. (Ejemplo: https://...).'
                })
            }
        }
        if (price) {
            if (price < 0 || price.toFixed(2) != price) {
                return res
                    .status(400)
                    .json({
                        message:
                            '⛔ No puedes introducir un precio negativo o con más de 2 decimales.'
                    })
            }
        }

        const productModified = new Products(req.body)
        productModified._id = id

        const productUpdated = await Products.findByIdAndUpdate(
            id,
            productModified,
            { new: true }
        )
        if (!productUpdated) {
            return res
                .status(400)
                .json({ message: '👎🏽 Ese producto no está en la BBDD.' })
        }
        return res.status(200).json({
            message: '✅ Producto actualizado correctamente.',
            productUpdated
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador updateProduct => ',
            error
        })
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        const productDeleted = await Products.findByIdAndDelete(id)
        if (!productDeleted) {
            return res.status(400).json({
                message: '👎🏽 Ese producto no está en la BBDD',
                productDeleted
            })
        }
        return res.status(200).json({
            message: 'Producto eliminado correctamente.',
            productDeleted
        })
    } catch (error) {
        return res.status(400).json({
            message: '❌ Error en el controlador deleteProduct => ',
            error
        })
    }
}

module.exports = {
    createListOfProducts,
    getProducts,
    getProductsByName,
    getProductsByPrice,
    updateProduct,
    deleteProduct
}
