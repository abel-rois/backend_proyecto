//importar librerias de antes para que esten accesibles
const express = require('express')
//llamar método Router
const router = express.Router()
//importar de controladores
const {getProducts, createProducts, updateProducts, deleteProducts} = require('../controllers/productsControllers')
const { protect } = require ('../middleware/authMiddleware')

//usar método o verbo /req peticion , res respuesta/función flecha y mensaje DE RES en JSON,se puede especificar status con el metodo .status, en post man se muestra el res con GET http://localhost:5000/api/tareas  /la diagonal puede dar la pauta para definir mas elementos
router.get('/', protect, getProducts)
router.post('/', protect, createProducts)

//método alternativo 
//router.route('/').get(getTareas).post(createTareas)

//añadir parametro a la url después del /  .  si ponemos id en el request de postman se mostrara el que pongamos en el res con req.params.id

//método alternativo
//router.route('/:id').delete(deleteTareas).put(putTareas)
router.put('/:id', protect, updateProducts)
router.delete('/:id', protect, deleteProducts)


//exportar Router
module.exports = router