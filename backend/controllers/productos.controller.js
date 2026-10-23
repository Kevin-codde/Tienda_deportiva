const pool = require('../config/db');

//get que toma solo los productos

const getProductos = async  (req,res)=>{

    try{
        var [rows] = await pool.query(
            'SELECT * FROM Productos WHERE stock_producto > 0'
        )
        res.json(rows);
    }catch(err){
        res.status(500).json({error: "Error al obtener productos"})
    }
}


const postProductos = async (req,res)=>{
    try{
        var {
           
            nombre_producto,
            descripcion_producto,
            precio_producto,
            id_usuario,
            stock_producto,
            talla_producto} = req.body;
        
        if(!nombre_producto || !descripcion_producto || !precio_producto){
            return res.status(400).json({error: "faltan campos"})
        }

           console.log(req.body);

            const [result] = 
            await pool.query(`INSERT INTO Productos(
            nombre_producto,
            descripcion_producto,
            precio_producto,
            id_usuario,
            stock_producto,
            talla_producto) VALUES (?,?,?,?,?,?)`,

            [nombre_producto,descripcion_producto,precio_producto,id_usuario,stock_producto,talla_producto]
        )

        console.log(req.body);

        res.json({message: "Producto registrado exitosamente!!"},{id: result.insertId});


    }

    catch(err){
        console.log("error encontrado: ",err);
        res.status(500).json({error: "No se pudo publicar el producto"})
    }
}

//Agregar una funcion para eliminar un producto y actualizar los datos de un producto

module.exports = {
    getProductos,
    postProductos
}