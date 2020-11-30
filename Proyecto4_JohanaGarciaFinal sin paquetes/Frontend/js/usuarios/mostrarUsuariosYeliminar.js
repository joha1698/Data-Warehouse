let intentoDOM = document.getElementById("intentoDOMUsuarios");
let filas = document.getElementById("filasUsuarios");

//Peticion para Mostrar Usuarios
function cargarUsuarios() {   
   let Token = sessionStorage.getItem("jwt");
   var valor = parseJwt(Token)
   console.log(valor);
    if(valor.id_tipoRol === 1){
        fetch('http://localhost:3000/usuarios', {
          method:'GET',
          headers: {
            "Content-Type":"application/json",           
        }            
    }).then(res => {
        res.json().then(usuarios => {
            console.log(usuarios);
            usuarios.forEach((u) => {
                let template = `<tr>
                    <td><input type="checkbox"></td>
                    <td>${u.nombreUsuario} ${u.apellidoUsuario}</td>
                    <td>${u.emailUsuario}</td>
                    <td>${u.tipoRol}</td>
                    <td><button type='button' id="${u.id}" class='btn btn-info btn-sm morado border-0' onclick="location.href='actualizarUsuario.html'"><span class="material-icons">editar</span></button>
                            <button type='button' class='btn btn-danger btn-sm bg-light moradoletra border-0' data-toggle="modal" data-target="#modalEliminar" onclick="eliminarUsuario('${u.id}') " ><span class="material-icons")">Eliminar</span></button>
                    </td></tr>`;  
                
                    filas.insertAdjacentHTML('beforeend', template); 
            });        
        })
        .catch()
    })
    }else{
        alert("No tienes acceso a la sección de usuarios")
    }
}

//eliminar
function eliminarUsuario(id) {
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol === 1){
        fetch(`http://localhost:3000/usuarios/${id}`, {
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
    }else{
        alert("No tienes permiso para eliminar usuarios")
    }     
}

window.addEventListener("load", cargarUsuarios)

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
