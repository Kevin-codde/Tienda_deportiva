const express = require("express")
const router = express.Router();

//importar funciones de seguridad
const {verificarToken} = require('../middlewares/auth.middleware');
const {isAdmin} = require('../middlewares/rol.middleware');




const {
    getProductos,
    postProductos
} = require('../controllers/productos.controller');

//RUTA PUBLICA
router.get("/",getProductos);

//RUTA PROTEGIDA
router.post("/crear",verificarToken,isAdmin,postProductos);

module.exports = router;