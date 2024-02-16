const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor teclea tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea tu email"],
        unique: true //en nuestra conexion no puede haber 2 usuarios que tengan el mismo email
    },
    password: {
        type: String,
        required: [true, "Por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        default: false //si yo no le creo el dato de admin se lo va a poner automaticamente como false
    },
},{
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)