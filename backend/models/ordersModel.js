const mongoose = require('mongoose')
//crear esquema
const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    orderNumber: { 
        type: String, 
        required: true, 
        unique: true },
    products: {        
        type: String, 
        required: true },
    paymentMethod: {
        type: String, 
        required: true, },
    totalAmount: {
        type: Number, 
        required: true, },
}, {
    //se colocara automaticamente la fecha de creación del registro y creara otro campo que se llamara modify date o fecha de modificación
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema) 