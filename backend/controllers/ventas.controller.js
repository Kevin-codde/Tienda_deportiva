const pool = require('../config/db');


const registrarVenta = async (req,res)=>{

    const query = `INSERT INTO Ventas(
            
            id_usuario,
            precio_total,
            fecha_venta
        ) VALUES (?,?,?)`;

    const queryDetail = `INSERT INTO Detalle_ventas(
            id_venta,
            id_producto,
            unidades_vendidas,
            precio_unitario,
            subtotal 	

        ) VALUES (?,?,?,?,?)`;

    try{
        var {
                
                id_usuario,
                precio_total,
                fecha_venta,
                productos

            } = req.body;

        if(!id_usuario || !precio_total || !fecha_venta || !productos){
            return res.status(400).json({error: "Faltan campos"});
        }



        const [result] = 
        await pool.query(query,[
                
                id_usuario,
                precio_total,
                fecha_venta
            ]);

        const id_factura_generada = result.insertId;
        
        // NUEVA QUERY: Resta la cantidad comprada al stock actual del producto
        
        const queryUpdateStock = `UPDATE Productos SET stock_producto = stock_producto - ? WHERE id_producto = ?`;

        for(const prod of productos){
            const subtotal = prod.unidades_vendidas * prod.precio_unitario;
            await pool.query(queryDetail,[
                id_factura_generada,
                prod.id_producto,
                prod.unidades_vendidas,
                prod.precio_unitario,
                subtotal
            ])

            await pool.query(queryUpdateStock,[
                prod.unidades_vendidas,
                prod.id_producto
            ])
        }

     return res.status(201).json({ 
            mensaje: "Venta y detalles registrados con éxito",
            id_factura: id_factura_generada 
        });
        
    }catch(err){
        console.error("Error al registrar venta: ", err);
        return res.status(500).json({ error: "Error interno en el servidor" });

    }
}

const getVentas = async (req,res)=>{

    const {id_venta} = req.params;
    
    try{
        const [rows] = await pool.query(`SELECT * FROM Ventas `,[id_venta]);
        res.json(rows);
        console.log("Venta encontrada encontrado")

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Error al obtener ventas"});
    }
}

const getDetalle = async (req, res) => {
    // Pedimos el ID de la factura (venta), no el del detalle
    const { id_venta } = req.params; 

    try {
        // Buscamos todas las filas que pertenezcan a esa factura
        const [rows] = await pool.query('SELECT * FROM Detalle_ventas WHERE id_venta = ?', [id_venta]);
        
        // Si no hay detalles para esa factura, podemos avisar
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron detalles para esta factura" });
        }

        res.json(rows);
        console.log("Detalles encontrados");

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener detalles" });
    }
}


module.exports = {
    registrarVenta,
    getVentas,
    getDetalle
}

