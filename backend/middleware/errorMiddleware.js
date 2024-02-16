//crear funcion encargada de manejar los errores, el next sirve para una vez que se ejecute la funcion se continue con la ejecucion del programa
const errorHandler = (err, req, res, next) => {
    //definirá el codigo del error que definamos
    const statusCode = res.statusCode ? res.statusCode : 500

    res.json({
        //mensaje de error de tareascontroller
        message: err.message,
        //mensaje al desarrollador, solo para modo desarrollo que se define en el .env
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

//exportar funcion
module.exports = {
errorHandler
}