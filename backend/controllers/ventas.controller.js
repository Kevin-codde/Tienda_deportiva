const pool = require('../config/db');

const nuevaVenta = async (req,res)=>{
    const id_usuario = req.user.id_usuario;

    const {total,productos} = req.body;

    try{
        const query = 'INSERT INTO Ventas (id_usuario,total_ventas) VALUES (?,?)'
        const queryDetail = 'INSERT INTO Detalle_ventas (cantidad,id_detalle,precio_unitario,producto_id,subtotal,venta_id) values (?,?,?,?,?,?)'
        
        const [resulVenta] = await pool.query(query,[id_usuario,total])

        //extraccion de id auto incremental de la venta
        const id_venta = resulVenta.insertId;


        for (const prod of productos){
            await pool.query(queryDetail,[prod.cantidad,prod.id_detalle,prod.precio_unitario,prod.producto_id,prod.subtotal,prod.venta_id])
        }

        return res.status(201).json({mess: "Venta registrada con exito!!",id_factura: id_venta});



    }catch(err){
        console.error("Error en crearVenta: ",err)
        return res.status(500).json({err:"Hubo un problema al procesar tu compra"})
    }
}

module.exports = {
    nuevaVenta
};

