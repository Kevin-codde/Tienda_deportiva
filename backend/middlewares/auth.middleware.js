const jwt = require('jsonwebtoken')

const verificarToken = (req,res,next)=>{

    const headers = req.headers['authorization'];

    // Tip de seguridad: si entran a la ruta sin headers de autorización, 
    // "headers" será undefined y el .split() rompería el servidor. 
    // Con este IF protegemos eso:
    if (!headers) {
        return res.status(401).json({ msg: "Token no proporcionado" });
    }

    const headersClean = headers.split(' ')[1];

    if(!headersClean){
        return res.status(401).json({msg: "Token no proporcionado"});
    }

    try{
        const verify = jwt.verify(headersClean,process.env.JWT_SECRET);

        req.user = verify;

        next();

    }catch(err){
        res.status(401).json({err: "El token es invalido o ha expirado"})
    }

}


module.exports = {
    verificarToken
}