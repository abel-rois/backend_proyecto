const express = require('express')
const router = express.Router()
//importar rutas
const {crearUser, loginUser, datosUser} = require('../controllers/usersControllers')
//importar función protectora
const { protect } = require('../middleware/authMiddleware')

router.post('/', crearUser)
router.post('/login', loginUser)
router.get('/datos', protect, datosUser)

module.exports = router

