//importar librerias de antes para que esten accesibles
const express = require('express')
//llamar método Router
const router = express.Router()
//importar de controladores
const {getOrders, createOrders, updateOrders, deleteOrders} = require('../controllers/ordersControllers')
const { protect } = require ('../middleware/authMiddleware')

//usar método o verbo /req peticion , res respuesta/función flecha y mensaje DE RES en JSON,se puede especificar status con el metodo .status, en post man se muestra el res con GET http://localhost:5000/api/tareas  /la diagonal puede dar la pauta para definir mas elementos
router.get('/', protect, getOrders)
router.post('/', protect, createOrders)

//método alternativo 
//router.route('/').get(getOrders).post(createOrders)

//añadir parametro a la url después del /  .  si ponemos id en el request de postman se mostrara el que pongamos en el res con req.params.id

//método alternativo
//router.route('/:id').delete(deleteOrders).put(putOrders)
router.put('/:id', protect, updateOrders)
router.delete('/:id', protect, deleteOrders)


//exportar Router
module.exports = router