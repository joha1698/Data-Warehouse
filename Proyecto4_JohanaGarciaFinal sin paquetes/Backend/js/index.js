const conexiones =require("./conexiones")
const validacionesUsuarios = require("./validacionesUsuarios");
const validacionesEmpresas = require("./validacionesEmpresas");
const validacionesContactos = require("./validacionesContactos");
const JWT = require("jsonwebtoken");

const port = 3000
conexiones.app.listen(port, ()=>{
    console.log("servidor corriendo en el puerto " + port)
});

//Helmet 
const helmet = require('helmet'); 
conexiones.app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"})); 
conexiones.app.use(function(req, res, next) { 
res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); 
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"); 
next(); });

   

/////////////////////////////////////////////////////////////////CRUD DE USUARIOS ////////////////////////////////////////////////////////

conexiones.app.post("/usuarios", validacionesUsuarios.datosCompletosUsuarios, validacionesUsuarios.usuarioExistenteCreacion, (req, res)=>{
    const {nombreUsuario, apellidoUsuario, emailUsuario, contrasena, id_tipoRol} =req.body;
    conexiones.sequelize.query("INSERT INTO usuarios (nombreUsuario, apellidoUsuario, emailUsuario, contrasena, id_tipoRol) VALUES (?,?,?,?,?)",
    {
        replacements: [nombreUsuario, apellidoUsuario, emailUsuario, contrasena, id_tipoRol],
        type:conexiones.sequelize. QueryTypes. INSERT
    }).then((respuesta)=>{
        res.status(200).json("usuario creado exitosamente, su ID es " + respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)

    })
});


conexiones.app.put("/actualizar", validacionesUsuarios.datosCompletosUsuarios, (req, res)=>{
    const { nombreUsuario, apellidoUsuario, emailUsuario, contrasena, id_tipoRol} =req.body;
    conexiones.sequelize.query("UPDATE usuarios SET nombreUsuario=?, apellidoUsuario=?, emailUsuario=?, contrasena=?, id_tipoRol=? WHERE emailUsuario=?",
    {
        replacements:[nombreUsuario, apellidoUsuario, emailUsuario, contrasena, id_tipoRol, emailUsuario],
        type:conexiones.sequelize.QueryTypes.UPDATE
    }).then((respuesta)=>{
        console.log("esta es la respuesta " + respuesta);
        res.status(200).json("Usuario actualizado con éxito");
    }).catch((error)=>{ 
        console.log(error);
        res.status(500).json(error);

    })    
});

conexiones.app.get("/usuarios", (req, res) => {
    conexiones.sequelize.query(`SELECT usuarios.id,
        usuarios.nombreUsuario,
        usuarios.apellidoUsuario,
        usuarios.emailUsuario,
        rol.tipoRol
        FROM usuarios JOIN rol ON usuarios.id_tipoRol = rol.id;`,
    {
        type:conexiones.sequelize.QueryTypes.GET

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    }) 
});

conexiones.app.delete("/usuarios/:id", (req, res)=>{
    if(req.params.id){
    let idProducto = req.params.id;
    conexiones.sequelize.query("DELETE FROM usuarios WHERE id = ?",
    {
        replacements:[idProducto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Usuario eliminado exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
    } 
});

//Login y generación de TOKEN de usuarios 
conexiones.app.post("/login", validacionesUsuarios.usuarioExistenteIngreso, (req, res)=>{
    const {emailUsuario, contrasena} =req.body;
    console.log(emailUsuario + contrasena)
    conexiones.sequelize.query("SELECT * FROM usuarios WHERE emailUsuario=? AND contrasena=?",
    {
        replacements: [emailUsuario, contrasena],
        type:conexiones.sequelize. QueryTypes. SELECT
    }).then((respuesta)=>{
        if(respuesta.length>0){
            console.log(respuesta)
            let usuario = respuesta[0]
            const payload = {
                nombreUsuario : usuario.nombreUsuario,
                apellidoUsuario : usuario.apellidoUsuario,
                emailUsuario: usuario.emailUsuario,
                contrasena: usuario.contrasena,
                id_tipoRol: usuario.id_tipoRol,
            };
            const Token = JWT.sign(payload, process.env.secreto);
            res.status(200).json(Token)
        }else{
            res.status(400).json("No tienes axceso a la plataforma")
        }
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    });
});


/////////////////////////////////////////////////////////////// CRUD REGIONES ///////////////////////////////////////////////////////

conexiones.app.post("/region", (req, res)=>{
    if(req.body.nombreRegion){
        if(typeof(req.body.nombreRegion)=="string"){
            conexiones.sequelize.query("INSERT INTO regiones (nombreRegion) VALUES (?)",
            {  
                replacements: [req.body.nombreRegion],
                type:conexiones.sequelize. QueryTypes. INSERT
            }).then((respuesta)=>
                {res.status(200).json("region creada exitosamente, su ID es " + respuesta[0]);
            }).catch((error)=>
                
                {res.status(500).json(error);
                    console.log(error)});
                }else{res.status(400).json("debe ingresar la propiedad nombreRegion como datos de tipo string")}
    }else{res.status(400).json("debe ingresar la propiedad nombreRegion")}
});

conexiones.app.put("/region", (req, res)=>{
        if(req.body.id && req.body.nombreRegion){
            const {id, nombreRegion,} =req.body;
        conexiones.sequelize.query("UPDATE regiones SET nombreRegion=? WHERE id=?;",
        {
            replacements:[nombreRegion, id],
            type:conexiones.sequelize.QueryTypes.UPDATE
        }).then((respuesta)=>{
            console.log(respuesta);
            res.status(200).json("Nombre de la region actualizada");
        }).catch((error)=>{
            console.log(error);
            res.status(500).json(error);
        })
    }else{
        res.status(400).json("ingrese las propiedades id y nombreRegion de la region que desea actualizar")
}});

conexiones.app.get("/regiones/", (req, res) => {
    conexiones.sequelize.query("SELECT * FROM regiones;",
    {
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
});

conexiones.app.delete("/region/:id", (req, res)=>{
    if(req.params.id){
    let idProducto = req.params.id;
    conexiones.sequelize.query("DELETE FROM regiones WHERE id = ?",
    {
        replacements:[idProducto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Region eliminada exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
    }    
});


/////////////////////////////////////////////////////////////// CRUD PAISES ///////////////////////////////////////////////////////

conexiones.app.post("/pais", (req, res)=>{
    if(req.body.nombrePais && req.body.id_Region){
        if(typeof(req.body.nombrePais)=="string"){
            conexiones.sequelize.query("INSERT INTO paises (nombrePais, id_Region) VALUES (?,?)",
            {  
                replacements: [req.body.nombrePais, req.body.id_Region],
                type:conexiones.sequelize. QueryTypes. INSERT
            }).then((respuesta)=>
                {res.status(200).json("Pais creado exitosamente, su ID es " + respuesta[0]);
            }).catch((error)=>
                
                {res.status(500).json(error);
                    console.log(error)});
                }else{res.status(400).json("debe ingresar la propiedad nombrePais como datos de tipo string")}
    }else{res.status(400).json("debe ingresar la propiedad nombreRegion y id_Region")}
});

conexiones.app.put("/pais", (req, res)=>{
        if(req.body.id && req.body.nombrePais){
            const {id, nombrePais,} =req.body;
        conexiones.sequelize.query("UPDATE paises SET nombrePais=? WHERE id=?;",
        {
            replacements:[nombrePais, id],
            type:conexiones.sequelize.QueryTypes.UPDATE
        }).then((respuesta)=>{
            console.log(respuesta);
            res.status(200).json("Nombre del país actualizado");
        }).catch((error)=>{
            console.log(error);
            res.status(500).json(error);
        })
    }else{
        res.status(400).json("ingrese las propiedades id y nombreRegion del pais que desea actualizar")
    }});

conexiones.app.get("/paises", (req, res) => {
    conexiones.sequelize.query("SELECT * FROM paises;",
    {
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
});

conexiones.app.delete("/pais/:id", (req, res)=>{
    if(req.params.id){
    let idProducto = req.params.id;
    conexiones.sequelize.query("DELETE FROM paises WHERE id = ?",
    {
        replacements:[idProducto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("País eliminado exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
    }    
});

/////////////////////////////////////////////////////////////// CRUD CIUDADES ///////////////////////////////////////////////////////

conexiones.app.post("/ciudad", (req, res)=>{
    if(req.body.nombreCiudad && req.body.id_Pais){
        conexiones.sequelize.query("INSERT INTO ciudades (nombreCiudad, id_Pais) VALUES (?,?)",
            {  
                replacements: [req.body.nombreCiudad, req.body.id_Pais],
                type:conexiones.sequelize. QueryTypes. INSERT
            }).then((respuesta)=>
                {res.status(200).json("Ciudad creada exitosamente, su ID es " + respuesta[0]);
            }).catch((error)=>
                {res.status(500).json(error);
                    console.log(error)});
    }else{res.status(400).json("debe ingresar la propiedad nombreCiudad y id_Region")}
});

conexiones.app.put("/ciudad", (req, res)=>{
        if(req.body.id && req.body.nombreCiudad && req.body.id_Pais){
            const {id, nombreCiudad, id_Pais} =req.body;
            conexiones.sequelize.query("UPDATE ciudades SET nombreCiudad=?, id_Pais=? WHERE id=?;",
            {
                replacements:[nombreCiudad, id_Pais, id],
                type:conexiones.sequelize.QueryTypes.UPDATE
            }).then((respuesta)=>{
                console.log(respuesta);
                res.status(200).json("Actualizacion realizada con exito");
            }).catch((error)=>{
                console.log(error);
                res.status(500).json(error);
        })
    }else{
        res.status(400).json("ingrese las propiedades id y nombrePais de la ciudad que desea actualizar")
    }});
 
conexiones.app.get("/ciudades", (req, res) => {
    conexiones.sequelize.query("SELECT * FROM ciudades;",
    {
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
});

conexiones.app.delete("/ciudad/:id", (req, res)=>{
    if(req.params.id){
    let idProducto = req.params.id;
    conexiones.sequelize.query("DELETE FROM ciudades WHERE id = ?",
    {
        replacements:[idProducto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Ciudad eliminada exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
    }    
});

/////////////////////////////////////////////////////////////// CRUD EMPRESAS ///////////////////////////////////////////////////////

conexiones.app.post("/empresa", validacionesEmpresas.datosCompletosEmpresa, validacionesEmpresas.empresaExistente, (req, res)=>{
    const {nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad} =req.body;
    conexiones.sequelize.query("INSERT INTO empresas (nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad) VALUES (?,?,?,?,?)",
            {  
                replacements: [nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad],
                type:conexiones.sequelize. QueryTypes. INSERT
            }).then((respuesta)=>
                {res.status(200).json("Empresa creada exitosamente, su ID es " + respuesta[0]);
            }).catch((error)=>            
                {res.status(500).json(error);
                    console.log(error)})
});


conexiones.app.put("/empresa", validacionesEmpresas.datosCompletosEmpresa, (req, res)=>{
    const {nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad, id} =req.body;
    conexiones.sequelize.query("UPDATE empresas SET nombreEmpresa=?, telefono=?, emailEmpresa=?, direccion=?, id_Ciudad=? WHERE emailEmpresa=?;",
    {
        replacements:[nombreEmpresa, telefono, emailEmpresa, direccion, id_Ciudad, emailEmpresa],
        type:conexiones.sequelize.QueryTypes.UPDATE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Actualizacion realizada con exito");
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);

})
    });


conexiones.app.get("/empresas", (req, res) => {
    let parametroId = req.params.id
    conexiones.sequelize.query(`SELECT empresas.nombreEmpresa,
        empresas.id,
        empresas.telefono,
        empresas.emailEmpresa,
        empresas.direccion,
        ciudades.nombreCiudad
        FROM empresas JOIN ciudades ON empresas.id_Ciudad = ciudades.id;`,
    {
        replacements:[parametroId],
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{
        console.log(respuesta[0]);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
});


conexiones.app.delete("/empresa/:id", (req, res)=>{
    if(req.params.id){
    let idProducto = req.params.id;
    console.log(idProducto);
    conexiones.sequelize.query("DELETE FROM empresas WHERE id = ?;",
    {
        replacements:[idProducto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Empresa eliminada con éxito")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json("Para eliminar una empresa primero debe eliminar los registros asociados a ella como la dirección de empresas y usuarios")
    })
    }    
});


/////////////////////////////////////////////////////////////// CRUD DE CONTACTOS ///////////////////////////////////////////////////////

conexiones.app.post("/contacto", validacionesContactos.datosCompletosContactos, validacionesContactos.contactoExistente, (req, res)=>{
    const {nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias} =req.body;
    conexiones.sequelize.query("INSERT INTO contactos (nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias) VALUES (?,?,?,?,?,?,?,?,?,?,?);",
            {  
                replacements: [nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias],
                type:conexiones.sequelize. QueryTypes. INSERT
            }).then((respuesta)=>
                {res.status(200).json("Contacto creado exitosamente, su ID es " + respuesta[0]);
            }).catch((error)=>            
                {res.status(500).json(error);
                    console.log(error)})
});


conexiones.app.put("/contacto", /*validacionesContactos.datosCompletosContactos,*/ (req, res)=>{
    if(req.body.emailContacto){
        const {nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias} =req.body;
        conexiones.sequelize.query("UPDATE contactos SET nombreContacto=?, apellidoContacto=?, cargoContacto=?, emailContacto=?, id_Empresa=?, id_Ciudad=?, id_direccionContacto=?, interes=?, canalDeContacto=?, cuentaUsuario=?, preferencias=? WHERE emailContacto=?;",
        {
            replacements:[nombreContacto, apellidoContacto, cargoContacto, emailContacto, id_Empresa, id_Ciudad, id_direccionContacto, interes, canalDeContacto, cuentaUsuario, preferencias, emailContacto],
            type:conexiones.sequelize.QueryTypes.UPDATE
        }).then((respuesta)=>{
            console.log(respuesta);
            res.status(200).json("Actualizacion realizada con exito");
        }).catch((error)=>{
            console.log(error);
            res.status(500).json(error);
        })
    }else{
        res.status(400).json("Debe ingresar el email del contacto que desea actualizar")
    }
});


conexiones.app.get("/contacto/:emailContacto", (req, res) => {
    if(req.params.emailContacto){
        let emailContacto = req.params.emailContacto
    conexiones.sequelize.query(`SELECT contactos.id,
        contactos.nombreContacto,
        contactos.apellidoContacto,
        contactos.cargocontacto,
        contactos.emailContacto,
        contactos.id_direccionContacto,
        contactos.interes,
        contactos.canalDeContacto,
        contactos.cuentaUsuario,
        contactos.preferencias,
        empresas.nombreEmpresa,
        ciudades.nombreCiudad,
        paises.nombrePais,
        regiones.nombreRegion,
        ciudades.id AS id_Ciudades 
        FROM contactos JOIN empresas ON contactos.id_Empresa = empresas.id
        JOIN ciudades ON ciudades.id = contactos.id_Ciudad
        JOIN paises ON paises.id = ciudades.id_Pais
        JOIN regiones ON regiones.id = paises.id_Region
        WHERE contactos.emailContacto = "${emailContacto}";`,
    {
        replacements:[emailContacto],
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0][0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
    } else{res.status(400).json("ingrese el id del contacto que desea consultar en la URL")}  
});
 
///intento contacto empresa
conexiones.app.get("/contactos", (req, res) => {
    conexiones.sequelize.query(`SELECT contactos.id,
    contactos.nombreContacto,
    contactos.apellidoContacto,
    contactos.cargocontacto,
    contactos.emailContacto,
    contactos.id_direccionContacto,
    contactos.interes,
    contactos.canalDeContacto,
    contactos.cuentaUsuario,
    contactos.preferencias,
    empresas.nombreEmpresa,
    ciudades.nombreCiudad,
    paises.nombrePais,
    regiones.nombreRegion,
    ciudades.id AS id_Ciudades 
    FROM contactos JOIN empresas ON contactos.id_Empresa = empresas.id
    JOIN ciudades ON ciudades.id = contactos.id_Ciudad
    JOIN paises ON paises.id = ciudades.id_Pais
    JOIN regiones ON regiones.id = paises.id_Region;`,
    {        
        type:conexiones.sequelize.QueryTypes.GET 

    }).then((respuesta)=>{        
        console.log(respuesta );
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
    
});

conexiones.app.delete("/contacto/:id", (req, res)=>{
    if(req.params.id){
    let idContacto = req.params.id;
    conexiones.sequelize.query("DELETE FROM contactos WHERE id = ?",
    {
        replacements:[idContacto],
        type:conexiones.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Contacto eliminado exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
    }    
});