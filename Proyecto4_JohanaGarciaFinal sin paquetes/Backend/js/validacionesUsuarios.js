const conexiones = require("./conexiones")


const datosCompletosUsuarios = (req, res, next)=>{
    const {apellidoUsuario, emailUsuario, contrasena, id_tipoRol} =req.body;
    const nombreUsuario = req.body.nombreUsuario;
    if(nombreUsuario && apellidoUsuario && emailUsuario && contrasena && id_tipoRol){
        console.log(nombreUsuario);
        if(typeof(nombreUsuario) === "string" 
        && typeof(apellidoUsuario) === "string" 
        && typeof(emailUsuario) ==="string" 
        && typeof(contrasena) === "string" 
        && typeof(id_tipoRol) ==="number"
        ){
            //validando RolUsuario
            if (id_tipoRol !== 1 && id_tipoRol !== 2 && id_tipoRol !== 3 ) {
                return res.send('Debe ingresar número 1 para Rol de administrador ó número 2 para Rol usuario ó número 3 para Rol contacto');
            }
            //validando constraseña 
            if(contrasena.length < 5){
                return res.send("La constraseña debe ser de mas de 5 caracteres")
            }
            next();
        }else{res.send("Valida que los tipos de datos sean correctos")}
    }else{res.send("datos incompletos o incorrectos")}
};

const usuarioExistenteCreacion = (req, res, next)=>{
    conexiones.sequelize.query("SELECT * FROM usuarios WHERE emailUsuario=?",
    {
        replacements: [req.body.emailUsuario],
        type:conexiones.sequelize.QueryTypes.SELECT
    }).then((respuesta)=>{
        console.log(respuesta.length);
        if(respuesta.length>0){
            res.status(409).json("El usuario ya existe");
            return;
        }
        next();
    });
};

const usuarioExistenteIngreso = (req, res, next)=>{
    console.log(req.body)
    conexiones.sequelize.query("SELECT * FROM usuarios WHERE emailUsuario=?",
    {
        replacements: [req.body.emailUsuario],
        type:conexiones.sequelize.QueryTypes.SELECT
    }).then((respuesta)=>{
        console.log(respuesta.length);
        if(respuesta.length == 0){
            res.status(409).json("El usuario no existe");
            return;
        }
        next();
    });
}

module.exports ={
    datosCompletosUsuarios,
    usuarioExistenteCreacion,
    usuarioExistenteIngreso
}