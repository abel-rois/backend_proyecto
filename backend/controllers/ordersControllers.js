//definir el asyncHandler para después usarlo en las funciones y envolver su contenido para hacer una especir de try catch
const asyncHandler = require('express-async-handler')
//llamar a nuestro modelo
const Order = require('../models/ordersModel')

//definir función GET(CONSULTA)
const getOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json(orders)
})

//definir función POST(CREACIÓN)
const createOrders = asyncHandler (async (req, res) => {
//si yo no pase la descripcion que me devuelva un bad request o status 400 y mensaje con un throw
    // if (!req.body.descripcion) {
    //     res.status(400)
    //     throw new Error('Por favor teclea una descripción')
    // }
    const order = await Order.create({
        totalAmount: req.body.totalAmount,
        paymentMethod: req.body.paymentMethod,
        products: req.body.products,
        orderNumber: req.body.orderNumber,
        user: req.user.id
    })
    res.status(201).json(order)
})

//definir función POST(ACTUALIZACIÓN)
const updateOrders = asyncHandler (async (req, res) => {
    //verificar que existe
    const order = await Order.findById(req.params.id)
    //si no existe
    if (!order) {
        res.status(400)
        throw new Error('Esa orden no existe')       
    }
    //nos aseguramos que la order pertenezca al usuario logeado, es decir el del token
    if (order.user.toString() !== req.user.id) {
       res.status(401)
       throw new Error('Usuario no autorizado') 
    } else {
    const orderUpdated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(orderUpdated)
    }
})

//definir función DELETE(ELIMINAR)
const deleteOrders = asyncHandler (async (req, res) => {
    //verificar que existe
    const order = await Order.findById(req.params.id)
    //si no existe
    if (!order) {
        res.status(400)
        throw new Error('Esa order no existe')       
    }
    if (order.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        await Order.deleteOne(order)
        //const orderDeleted = await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})


//exportar

module.exports = {
    getOrders,
    createOrders,
    updateOrders,
    deleteOrders
}