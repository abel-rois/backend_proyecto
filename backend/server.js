
//importar librerias de antes para que esten accesibles
const express = require('express')
//colorar mensajes en console log
const colors = require('colors')
//IMPORTAR FUNCION DE DB
const connectDB = require('./config/db')

const dotenv = require('dotenv').config()
//exportar funcion de errores
const {errorHandler} = require('./middleware/errorMiddleware')

//importar cors
const cors = require('cors')

//definir puerto de escucha del backend/se agrega el metodo process para leer variable de entorno y se agrega un or con un puerto alternativo
const port = process.env.PORT || 5000

//LLAMAR CONSTANTE DE CONNECTDB DE ARRIBA
connectDB()

//definir aplicacion
const app = express()

//ejecutar cors
app.use(cors())

//definir metodos express para usar url encoded en el body de postman
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

//cuando teclee url api tareas la app  va a llamar a las tareas routes que defini en la carpeta de rutas, cunado pondo ruta tareas busque routes tareasroutes
app.use('/api/orders', require('./routes/ordersRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/products', require('./routes/productsRoutes'))
//decir a la app que usaremos el manejador de errores
app.use(errorHandler)

//lo que escucha la app, en qué puerto
app.listen(port, ()=> console.log(`el servidor está iniciando en el puerto ${port}`))
