const conexiones = require("./conexiones")

const datosCompletosEmpresa = (req, res, next)=>{
    const {nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad} =req.body;

    if(nombreEmpresa && telefono && emailEmpresa && direccion && id_Ciudad){

        if(typeof(nombreEmpresa) === "string" 
        && typeof(telefono) === "string" 
        && typeof(emailEmpresa) ==="string" 
        && typeof(direccion) === "string" 
        && typeof(id_Ciudad) ==="number"
        ){
            next();
        }else{res.send("Valida que los tipos de datos sean correctos")}
    }else{res.send("datos incompletos o incorrectos")}
};

const empresaExistente = (req, res, next)=>{
    conexiones.sequelize.query("SELECT * FROM empresas WHERE emailEmpresa=?",
    {
        replacements: [req.body.emailEmpresa],
        type:conexiones.sequelize.QueryTypes.SELECT
    }).then((respuesta)=>{
        console.log(respuesta.length);
        if(respuesta.length>0){
            res.status(409).json("La empresa ya existe");
            return;
        }
        next();
    });
};


module.exports ={
    datosCompletosEmpresa,
    empresaExistente,
}