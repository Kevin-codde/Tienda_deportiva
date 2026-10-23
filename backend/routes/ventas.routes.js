const  express = require('express');
const  router = express.Router();

//importar funciones de seguridad
const {verificarToken} = require('../middlewares/auth.middleware');
const { isAdmin } = require('../middlewares/rol.middleware');

const {
    registrarVenta,
    getVentas,
    getDetalle
} = require('../controllers/ventas.controller');


router.post("/facturar",verificarToken,registrarVenta);
router.get("/:id_venta", verificarToken, isAdmin, getVentas);
router.get("/detalle/:id_venta",verificarToken,isAdmin,getDetalle);

module.exports = router;


