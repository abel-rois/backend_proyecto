const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

//añadir async, await y el asyncHandler de express(que maneja excepciones)
//definir función POST(CREACIÓN)
const crearUser = asyncHandler( async (req, res) => {

    const { name,email,password } = req.body //destructurar el body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //verificar que ese usuario no exista a través de su email
    const userExiste = await User.findOne({email})
    if (userExiste) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //Hacer el hash al password, al decimo numero aleatorio que genere se guarda en la sal
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //crear el usuario

const user = await User.create ({
    name,
    email, //se puede email:email también, aqui aplica porque el campo se llema igual al valor
    password: hashedPassword
})

    if (user) {
        res.status(201).json({
            _id: user.id, //en mongo un id lleva un _       
            name: user.name,
            email: user.name
    })
     } else {
        res.status(400)
        throw new Error('no se pudieron guardar los datos')
     }

    // res.status(201).json({ message : 'Crear Usuario'}) //creado
})

//definir función POST(INICIO DE SESIÓN)
const loginUser = asyncHandler( async (req, res) => {

    const {email, password} = req.body
    //verificar que exista un usuario con ese email
    const user = await User.findOne({email})
    //si el usuario existe verificamos también el password, se compara el hash con un password, si es igua
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id, //en mongo un id lleva un _       
            name: user.name,
            email: user.name,
            token: generarToken(user.id)
        })
    }else { 
            res.status(400)
            throw new Error('credenciales incorrectas')       
    }
})

//definir función GET(CONSULTA)
const datosUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user) 
})

//función para generar token para poder logearse
const generarToken = (id_usuario) => {
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

//exportar

module.exports = {
    crearUser,
    loginUser,
    datosUser
}