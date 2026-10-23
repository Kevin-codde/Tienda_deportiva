require('dotenv').config();
const express = require("express");
const PORT = 3000;


const app = express()

app.use(express.json())


//importar 

const rutasProductos = require("./routes/productos.routes")
const rutasUsuarios = require("./routes/usuarios.routes")
const rutasVentas = require("./routes/ventas.routes")

app.use('/productos',rutasProductos);
app.use('/usuario',rutasUsuarios);
app.use('/ventas',rutasVentas)


app.get("/",(req,res)=>{
    res.send("Servidor funcionando")
})


app.listen(PORT,()=>{
    console.log(`Servidor corriendo en puerto: http://localhost:${PORT}/ `)
})

