const jwt = require('jsonwebtoken');

const isAdmin = (req,res,next)=>{
    const user = req.user;

    const userRol = user ? user.rol_usuario : null;

    if(!user || useRol !== 'admin' ){
        return res.status(403).json({mess:"Acceso denegado, debe ser administrador"})

    }

    next()
}


module.exports= {
    isAdmin
}