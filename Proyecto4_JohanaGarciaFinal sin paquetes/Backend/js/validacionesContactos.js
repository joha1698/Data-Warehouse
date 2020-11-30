const conexiones = require("./conexiones")

const datosCompletosContactos = (req, res, next)=>{
    const {nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias, id_tipoRol} =req.body;

    if(nombreContacto && apellidoContacto && cargoContacto && emailContacto && id_Empresa && id_Ciudad && id_direccionContacto && interes && canalDeContacto && cuentaUsuario && preferencias){
    
        if(typeof(nombreContacto) === "string" 
        && typeof(apellidoContacto) === "string" 
        && typeof(cargoContacto) === "string" 
        && typeof(emailContacto) ==="string" 
        && typeof(id_Empresa) === "number" 
        && typeof(id_Ciudad) ==="number"
        && typeof(id_direccionContacto) === "string" 
        && typeof(interes) === "string" 
        && typeof(canalDeContacto) ==="string"
        && typeof(cuentaUsuario) === "string" 
        && typeof(preferencias) ==="string"
        
        ){
            next();
        }else{res.send("Valida que los tipos de datos sean correctos")}
    }else{res.send("datos incompletos o incorrectos")}
};

const contactoExistente = (req, res, next)=>{
    conexiones.sequelize.query("SELECT * FROM contactos WHERE emailContacto=?",
    {
        replacements: [req.body.emailContacto],
        type:conexiones.sequelize.QueryTypes.SELECT
    }).then((respuesta)=>{
        console.log(respuesta.length);
        if(respuesta.length>0){
            res.status(409).json("El contacto ya existe ingrese un correo diferente");
            return;
        }
        next();
    });
};


module.exports ={
    datosCompletosContactos,
    contactoExistente,
}