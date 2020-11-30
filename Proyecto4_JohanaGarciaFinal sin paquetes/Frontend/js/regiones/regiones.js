let nombreRegion = document.getElementById("regionInput");
var toggler = document.getElementsByClassName("caret");
let arbol = document.getElementById("myUL");
let liUsuarios = document.getElementById("liUsuarios");

window.addEventListener("load", ()=>{
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol===2 || valor.id_tipoRol===3){
        liUsuarios.classList.add("ocultarUsuarios")
    }
});

for (var i=0; i<toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
    return JSON.parse(jsonPayload);
};

//Mostrar regiones 
window.addEventListener("load", ()=>{mostrarRegiones()})

function mostrarRegiones() {   
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    if(valor){
        fetch('http://localhost:3000/regiones', {
           method:'GET',
           headers: {
             "Content-Type":"application/json",           
         }            
     }).then(res => {
         res.json().then(regiones => {
             console.log(regiones)
             regiones.forEach((r) => {
                 let template =
                 `<li class="marginLi">
                    <span class="titulo2">${r.nombreRegion}</span>
                    <button name="Regiones" class="btn btn-outline-primary bordeBoton botonCentrado1" type="submit" data-toggle="modal" data-target="#edit" id="${r.nombreRegion}" onclick="modalRegiones(${r.id},'${r.nombreRegion}')">Acciones</button>
                    <button type="button" class="btn btn-outline-success bordeBoton2 botonCentrado2" data-toggle="modal" data-target="#agregarPaisCiudad" onclick="modalPaisCrear(${r.id},'${r.nombreRegion}')">Agregar País</button>
                        <ul class="nested" id='region${r.id}'>
                        </ul>
                    </li>`;
                        arbol.insertAdjacentHTML('beforeend', template);            
             });  
             mostrarPaises();
             
        }).catch() 
    })
}else{
    alert("No estás registrado")
}      
}

function modalRegiones(id,nombre) {
    document.getElementById('modalEdit').innerHTML = '';
    let modal = document.getElementById('modalEdit');   
    let template = 
        `<label for="nombre">Region:</label>
        <input id="nombre" value='${nombre}' name="name" type="text" placeholder="Ingrese el valor" class="form-control" required>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" onclick="actualizarRegion(${id})" >Editar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarRegion(${id})" >Eliminar</button>
        </div>
        <p id="responseEditarRegion" class="login-card-footer-text"></p>`;  
    modal.insertAdjacentHTML('beforeend', template);    
}

//Agregar regiones
function agregarRegion() {   
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        console.log(valor);
     fetch('http://localhost:3000/region', {
           method:'POST',
           body:`{"nombreRegion":"${nombreRegion.value}"}`,
        headers:{"Content-Type":"application/json"}            
     }).then(res => {
         res.json().then(resJson =>{
            console.log(resJson);
            alert("Region creada exitosamente");
            location.reload()
         } 
         ).catch() 
    })
}else{
    alert("No estás registrado")
} 
}

//Actualizar Región
function actualizarRegion(id) {
    let nombreRegion = document.getElementById('nombre');
    let respuestaEditarRegion = document.getElementById("responseEditarRegion");   
    document.getElementById('responseEditarRegion').innerHTML = '';
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch(`http://localhost:3000/region`, {
        method: 'PUT',
        body: `{
                "id": "${id}",
                "nombreRegion": "${nombreRegion.value}"
        }`,
        headers:{"Content-Type":"application/json"}
    }).then(res => {
    if (res.status == 200) {
        res.json().then(data => {
        console.log(data);
        alert(data)
        location.reload(); 
        });
    } else {
       respuestaEditarRegion.textContent = `La región ya existe, valida e intenta nuevamente`;
        }
    }).catch(error => {
        console.log(error);
    });
    }else{
        alert("No estás registrado")
    }      
}

//eliminar región
function eliminarRegion(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch(`http://localhost:3000/region/${id}`, {
        method: 'DELETE',
        body: `{
        }`,
        headers:{"Content-Type":"application/json"}
}).then(res => {
    if (res.status == 200) {
        res.json().then(data => {
        console.log(data);
        alert(data)
        location.reload();
        });
    } else {
        alert('Primero se debe eliminar los paises y ciudades asociadas a la región')
        }
    }).catch(error => {
        console.log(error);
    });

    }else{
        alert("No estás registrado")
    }      
}

////////////////////////////////////////////////////         PAISES      ///////////////////////////////////////////////

//Mostrar paises
function mostrarPaises() {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch('http://localhost:3000/paises', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",           
            }
    }).then(res => {
        res.json().then(paises => {
            console.log(paises)
            paises.forEach((e) => {
                let nodoRegion = document.getElementById(`region${e.id_Region}`);
                if (nodoRegion) {
                    let templatePaises = 
                    `<li class="paddingLi paises" >${e.nombrePais}
                        <button type="submit" class="btn btn-outline-primary bordeBoton" data-toggle="modal" data-target="#edit" id="${e.id}-${e.nombrePais}" onclick="modalPais('${valor}',${e.id},'${e.nombrePais}')">Acciones</button>
                        <button type="button" class="btn btn-outline-success bordeBoton2" data-toggle="modal" data-target="#agregarPaisCiudad" onclick="modalCiudadCrear('${valor}',${e.id},'${e.nombrePais}')">Agregar Ciudad</button>
                        <ul class="nested" id='pais${e.id}'></ul>
                    </li>`
                   nodoRegion.insertAdjacentHTML('beforeend', templatePaises);
                   
                }
            });
            ciudades();
        });
       
    }).catch(error => {
        console.log(error);
    });
}else{
    alert("No estás registrado")
} 
};

function modalPais(jwt,id,nombre) {
    document.getElementById('modalEdit').innerHTML = '';
    let modal = document.getElementById('modalEdit');
    let template = 
    `<label for="nombre">País:</label>
        <input id="nombre" value='${nombre}' name="name" type="text" placeholder="Ingrese el valor" class="form-control" required>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="editarPais('${jwt}',${id})">Editar</button>
            <button type="button" class="btn btn-danger" onclick="eliminarPais(${id})">Eliminar</button>
        </div>
        <p id="responseEditarPais" class="login-card-footer-text"></p>`;
    modal.insertAdjacentHTML('beforeend', template);    
}

function modalPaisCrear(id,nombre) {
    document.getElementById('crearPaisCiudad').innerHTML = '';
    let modal = document.getElementById('crearPaisCiudad');
    let template = 
    `<label for="region-id:">El pais se agregara a la región: ${nombre}</label>
    <input id="paisCrear" name="name" type="text" placeholder="Nombres" class="form-control" required>
    <div class="modal-footer">
    <button type="button" class="btn btn-success" onclick="CrearPais(${id})">Crear</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
    </div>
    <p id="agregarPais" class="login-card-footer-text"></p>`;
    modal.insertAdjacentHTML('beforeend', template);    
}

//Cear pais 
function CrearPais(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        let respuestaAgregarPais = document.getElementById("agregarPais");
        let pais=document.getElementById("paisCrear");
        document.getElementById('agregarPais').innerHTML = '';
        fetch("http://localhost:3000/pais", {
                method: 'POST',
                body:`{"nombrePais":"${pais.value}",
                "id_Region": ${id}}
                `,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    setTimeout(()=>{
                        location.reload();
                    }, 1000
                    )
                    
                });
            } else {
                respuestaAgregarPais.textContent = `El país ya existe, valida e intenta nuevamente`;
                }
            }).catch(error => {
                console.log(error);
                respuestaAgregarPais.textContent = "Se presento un error intenta nuevamente";
        });
    }else{
        alert("No estás registrado")
    } 
};

//modificar País responseEditarPais
function editarPais(jwt, id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        let paisModificar = document.getElementById('nombre');
        let respuestaEditarPais = document.getElementById("responseEditarPais");   
        document.getElementById('responseEditarPais').innerHTML = '';
        if (jwt != null) {
            fetch(`http://localhost:3000/pais`, {
                method: 'PUT',
                body: `{
                        "nombrePais": "${paisModificar.value}",
                        "id": "${id}"
                }`,
                headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                console.log(data);
                location.reload(); 
                });
            } else {
                respuestaEditarPais.textContent = `El país ya existe, valida e intenta nuevamente`;
                }
            }).catch(error => {
                console.log(error);
            }); 
        }else{
            alert("No estás registrado")
        } 
    }    
}

//Eliminar pais
function eliminarPais(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch(`http://localhost:3000/pais/${id}`, {
            method: 'DELETE',
            body: `{
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            location.reload();
            });
        } else {
            alert('Primero se debe eliminar las ciudades asociadas a la país')
            }
        }).catch(error => {
            console.log(error);
        });
    }else{
        alert("No estás registrado")
    } 
}

function modalCiudadCrear(jwt,id,nombre) {
    document.getElementById('crearPaisCiudad').innerHTML = '';
    let modal = document.getElementById('crearPaisCiudad');
    let template = 
    `<label for="pais-id:">La ciudad se agregara al País: ${nombre}</label>
    <input id="ciudadCrear" name="name" type="text" placeholder="Nombres" class="form-control" required>
    <div class="modal-footer">
    <button type="button" class="btn btn-success" onclick="CrearCiudad(${id})">Crear</button>
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
    </div>
    <p id="agregarCiudad" class="login-card-footer-text"></p>`;
    modal.insertAdjacentHTML('beforeend', template);    
}
/////////////////////////////////////////////////////////////// CIUDADES ///////////////////////////////////////////////////////

//Cargar ciudad
function ciudades() {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch('http://localhost:3000/ciudades', {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",           
            }
    }).then(res => {
        res.json().then(ciudades => {
            console.log(ciudades)
            ciudades.forEach((e) => {
                let nodoPais = document.getElementById(`pais${e.id_Pais}`);
                if (nodoPais) {
                    let templatePais = 
                    `<li class="marginLiCiudades">${e.nombreCiudad}<button class="btn btn-outline-primary bordeBoton marginboton" type="submit" data-toggle="modal" data-target="#edit" id=${e.id} onclick="modalCiudad(${e.id},'${e.nombreCiudad}', ${e.id_Pais})">Acciones</button></li>`
                    nodoPais.insertAdjacentHTML('beforeend', templatePais);  
                }
            });
        });
    }).catch(error => {
        console.log(error);
    });
    }else{
        alert("No estás registrado")
    } 
};

//Crear ciudad
function CrearCiudad(id) {
    console.log(id)
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    let respuestAgregarCiudad = document.getElementById("agregarCiudad");
    let ciudad=document.getElementById("ciudadCrear");
    document.getElementById('agregarCiudad').innerHTML = '';
    if(valor){
        fetch("http://localhost:3000/ciudad", {
            method: 'POST',
            body:`{
                "nombreCiudad":"${ciudad.value}",
                "id_Pais": ${id}}
            `,
        headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    location.reload();
                });
            } else {
                respuestAgregarCiudad.textContent = `La ciudad ya existe, valida e intenta nuevamente`;
                }
            }).catch(error => {
                console.log(error);
                respuestAgregarCiudad.textContent = "Se presento un error intenta nuevamente";
            });
    }else{
        alert("No estás registrado")
    }     
}; 

//Modal ciudad
function modalCiudad(id, nombre, id_Pais) {
    document.getElementById('modalEdit').innerHTML = '';
    let modal = document.getElementById('modalEdit');
    let template = 
        `<label for="nombre">Ciudad:</label>
        <input id="nombre" value='${nombre}' name="name" type="text" placeholder="Ingrese el valor" class="form-control" required>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success"  onclick="editarCiudad(${id}, ${id_Pais})" >Editar</button>
        <button type="button" class="btn btn-danger" onclick="eliminarCiudad(${id})" >Eliminar</button>
        </div>
        <p id="responseEditarCiudad" class="login-card-footer-text"></p>`;
    modal.insertAdjacentHTML('beforeend', template);    
    console.log(id_Pais)
}

//Modificar Ciudad 
function editarCiudad(id, id_Pais) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    let ciudadModificar = document.getElementById('nombre');
    let respuestaEditarCuidad = document.getElementById("responseEditarCiudad");   
    document.getElementById('responseEditarCiudad').innerHTML = '';
    if(valor){
        fetch(`http://localhost:3000/ciudad`, {
             method: 'PUT',
             body: `{
                     "nombreCiudad": "${ciudadModificar.value}",
                     "id": ${id},
                     "id_Pais": "${id_Pais}"
             }`,
             headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                alert(data)
                location.reload();
                });
            } else {
                respuestaEditarCuidad.textContent = `La cuidad ya existe, valida e intenta nuevamente`;
                }
            }).catch(error => {
                console.log(error);
        });
    }else{
        alert("No estás registrado")
    }     
}

//Eliminar ciudad
function eliminarCiudad(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token);
    if(valor){
        fetch(`http://localhost:3000/ciudad/${id}`, {
            method: 'DELETE',
            body: `{
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            alert(data)
            location.reload();
            });
        } else {
            console.log("error al eliminar la ciudad, intenta nuevamente");
            }
        }).catch(error => {
            console.log(error);
        });
    }else{
        alert("No estás registrado")
    }    
}

