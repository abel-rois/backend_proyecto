//definir el asyncHandler para después usarlo en las funciones y envolver su contenido para hacer una especir de try catch
const asyncHandler = require('express-async-handler')
//llamar a nuestro modelo
const Product = require('../models/productsModel')

//definir función GET(CONSULTA)
const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.find({ user: req.user.id })
    res.status(200).json(products)
})

//definir función POST(CREACIÓN)
const createProducts = asyncHandler (async (req, res) => {
//si yop no pase la descripcion que me devuelva un bad request o status 400 y mensaje con un throw
    // if (!req.body.descripcion) {
    //     res.status(400)
    //     throw new Error('Por favor teclea una descripción')
    // }
    const product = await Product.create({
        stock: req.body.stock,
        boughtPrice: req.body.boughtPrice,
        salesPrice: req.body.salesPrice,
        departament: req.body.departament,
        brand: req.body.brand,
        name: req.body.name,
        sku: req.body.sku,
        user: req.user.id
    })
    res.status(201).json(product)
})

//definir función POST(ACTUALIZACIÓN)
const updateProducts = asyncHandler (async (req, res) => {
    //verificar que existe
    const product = await Product.findById(req.params.id)
    //si no existe
    if (!product) {
        res.status(400)
        throw new Error('Esa orden no existe')       
    }
    //nos aseguramos que la order pertenezca al usuario logeado, es decir el del token
    if (product.user.toString() !== req.user.id) {
       res.status(401)
       throw new Error('Usuario no autorizado') 
    } else {
    const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(productUpdated)
    }
})

//definir función DELETE(ELIMINAR)
const deleteProducts = asyncHandler (async (req, res) => {
    //verificar que existe
    const product = await Product.findById(req.params.id)
    //si no existe
    if (!product) {
        res.status(400)
        throw new Error('Esa order no existe')       
    }
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        await Product.deleteOne(product)
        //const orderDeleted = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({ id: req.params.id })
    }
})


//exportar

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}