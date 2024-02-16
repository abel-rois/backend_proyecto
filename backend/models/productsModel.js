const mongoose = require('mongoose')
//crear esquema
const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    sku:{
        type: String,
        require: true,
        maxlength: 20
    },  
    name:{
        type: String,
        require: true,
        maxlength: 30
    },
    brand: {
        type: String,
        required: true,
        maxlength: 30
    },
    departament:{
        type: String,
        require: true,
        maxlength: 50
    },
    salesPrice:{
        type: Number,
        require: true,
        maxlength: 10
    },
    boughtPrice:{
        type: Number,
        require: true,
        maxlength: 10
    },
    stock:{
        type: Number,
        require: true,
        maxlength: 10
    },
}, {
    //se colocara automaticamente la fecha de creación del registro y creara otro campo que se llamara modify date o fecha de modificación
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema) 