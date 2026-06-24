const  express = require('express');
const  routes = express.Router();


const {
    getUser,
    register,
    login
} = require('../controllers/usuarios.controller')


routes.get("/:id_usuario",getUser);
routes.post("/register",register);
routes.post("/login",login);


module.exports = routes;


