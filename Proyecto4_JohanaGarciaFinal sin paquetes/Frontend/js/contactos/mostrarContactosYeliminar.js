let intentoDOM = document.getElementById("intentoDOM");
let botonBuscar = document.getElementById("botonBuscar");
let contenedorPrincipal = document.getElementById("contenedorPrincipal");
let filas = document.getElementById("filas");
let inputEmail = document.getElementById("inputEmail");
let liUsuarios = document.getElementById("liUsuarios");

window.addEventListener("load", ()=>{
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol===2 || valor.id_tipoRol===3){
        liUsuarios.classList.add("ocultarUsuarios")
    }
});

//Peticion para Mostrar Contactos
function cargarContactos() {   
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor){
        fetch('http://localhost:3000/contactos', {
          method:'GET',
          headers: {
            "Content-Type":"application/json",           
        }            
    }).then(res => {
        res.json().then(contactos => {
            console.log(contactos);
            contactos.forEach((c) => {
                let template = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${c.nombreContacto} ${c.apellidoContacto}</td>
                    <td>${c.nombreRegion} / ${c.nombrePais}</td>
                    <td>${c.nombreEmpresa}</td>
                    <td>${c.cargocontacto}</td> 
                    <td>${c.canalDeContacto}</td>
                    <td><div class="progress">
                            <div class="progress-bar" style="width: ${c.interes}" role="progressbar" aria-valuenow="${c.interes}" aria-valuemin="0" aria-valuemax="100">${c.interes}</div>
                        </div>
                    </td>
                    <td><button type='button' id="${c.id}" class='btn btn-info btn-sm morado border-0' onclick="location.href='actualizarContacto.html'"><span class="material-icons">editar</span></button>
                            <button type='button' class='btn btn-danger btn-sm bg-light moradoletra border-0' data-toggle="modal" data-target="#modalEliminar" onclick="eliminarContacto('${c.id}') " ><span class="material-icons")">Eliminar</span></button>
                    </td></tr>`;  
                
                    filas.insertAdjacentHTML('beforeend', template); 
            });
        
        
        })
        .catch()

    })        
}else{alert("No tienes permisos para realizar esta acción")}
}

//eliminar
function eliminarContacto(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor){
        fetch(`http://localhost:3000/contacto/${id}`, {
            method: 'DELETE',
            body: `{
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            console.log(data);
            alert("Usuario eliminado con éxito")
            location.reload();
            });
        } else {
            console.log("error2");
            alert('Primero se debe eliminar los conctatos asociados a la compañia')
            }
        }).catch(error => {
            console.log(error);
        }); 
    }else{alert("No estás registrado")}    
}

//Buscar contactos por medio de su email
function buscarContacto() {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor){
        let emailContacto = inputEmail.value;
    fetch(`http://localhost:3000/contacto/${emailContacto}`, {
            method: 'GET',
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            console.log(data);
            filas.innerHTML = " ";
            let template = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${data.nombreContacto} ${data.apellidoContacto}</td>
                    <td>${data.nombreRegion} / ${data.nombrePais}</td>
                    <td>${data.nombreEmpresa}</td>
                    <td>${data.canalDeContacto}</td>
                    <td>${data.cargoContacto}</td>                    
                    <td><div class="progress">
                            <div class="progress-bar" style="width: ${data.interes}" role="progressbar" aria-valuenow="${data.interes}" aria-valuemin="0" aria-valuemax="100">${data.interes}</div>
                        </div>
                    </td>
                    <td><button type='button' id="${data.id}" class='btn btn-info btn-sm morado border-0' onclick="location.href='actualizarContacto.html'"><span class="material-icons">editar</span></button>
                            <button type='button' class='btn btn-danger btn-sm bg-light moradoletra border-0' data-toggle="modal" data-target="#modalEliminar" onclick="eliminarContacto('${data.id}') " ><span class="material-icons")">Eliminar</span></button>
                    </td></tr>`;  
                
                    filas.insertAdjacentHTML('beforeend', template); 
            });
        } else {
            console.log("error2");
            alert('Primero se debe eliminar los conctatos asociados a la compañia')
            }
        }).catch(error => {
            console.log(error);
        });

    }else{
        alert("No estás registrado")
    }     
}

window.addEventListener("load", cargarContactos)
botonBuscar.addEventListener("click", buscarContacto);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join(''));
    return JSON.parse(jsonPayload);
};


setTimeout(() => {
    $(document).ready(function() {
        $('#tablaCompanias').DataTable();
    });
}, 100);
