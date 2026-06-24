const express = require("express")
const router = express.Router();



const {
    getProductos,
    postProductos
} = require('../controllers/productos.controller');

router.get("/",getProductos)
router.post("/",postProductos)

module.exports = router;