const pool = require('../config/db');
const bcrypt = require('bcrypt');


//tomar usuarios registrados

const getUser = async (req,res)=>{

    const {id_usuario} = req.params;
    
    try{
        const [rows] = await pool.query(`SELECT * FROM Usuarios WHERE id_usuario = ? `,[id_usuario]);
        res.json(rows);
        console.log("Usuario encontrado")

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Error al obtener productos"});
    }
}


const register = async (req,res)=>{
    //console.log("Datos recibidos en el body:", req.body);
    const {
        id_usuario,
        nombre_usuario,
        email_usuario,
        password_usuario
    } = req.body;
    //Validar que todos los campos se rellenen
    if(!id_usuario || !nombre_usuario || !email_usuario || !password_usuario){
        return res.status(400).json({message: "Debe completar todos los datos"});
    }

    try{
        //encriptar
        const salt = await bcrypt.genSalt(10);
        const encriptPass = await bcrypt.hash(password_usuario,salt);

        const query = 'INSERT INTO Usuarios (id_usuario,nombre_usuario,email_usuario,password_usuario) VALUES (?,?,?,?)';
        await pool.query(query,[id_usuario,nombre_usuario,email_usuario,encriptPass]);

        return res.status(201).json({messege:"Usuario agregado exitosamente"})
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Error al registrar usuario"})
    }

    
}

//Login (inicio de sesion)

const login = async (req,res)=>{
    const {
        email_usuario,
        password_usuario
    }= req.body;

    if(!email_usuario || !password_usuario){
        return res.status(400).json({mess: "Correo o contrasena no ingresados"});
    }

    try{
      const query = "SELECT * FROM Usuarios WHERE email_usuario = ?"
      const [rows] = await pool.query(query,[email_usuario]) ;

      if(rows.length === 0){
            return res.status(401).json({messege:"Usuario no existe"});
      }

      const usuario = rows[0];

      const comparePass = await bcrypt.compare(password_usuario,usuario.password_usuario)

      if(comparePass){
        
         return res.status(200).json({mess: "Sesion iniciada con exito",
            usuario: {
                    id: usuario.id_usuario,
                    nombre: usuario.nombre_usuario,
                    rol: usuario.rol_usuario
                }
         })
         

      }else{
         return res.status(401).json({mess:"Contrasena incorrecta"})
      }


    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Error interno en el servidor" });
    }
}





//exportar modulo
module.exports = {
    getUser,
    register,
    login
}
    
