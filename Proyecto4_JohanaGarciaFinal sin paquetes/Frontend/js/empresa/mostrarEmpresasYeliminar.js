let intentoDOM = document.getElementById("intentoDOMEmpresas");
let filas = document.getElementById("filasEmpresas");
let liUsuarios = document.getElementById("liUsuarios");

window.addEventListener("load", ()=>{
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol===2 || valor.id_tipoRol===3){
        liUsuarios.classList.add("ocultarUsuarios")
    }
});

//Peticion para Mostrar Empresas
function cargarEmpresas() {   
   let Token = sessionStorage.getItem("jwt");
   var valor = parseJwt(Token)
   console.log(valor);
   if(valor){
    fetch('http://localhost:3000/empresas', {
        method:'GET',
        headers: {
          "Content-Type":"application/json",           
      }            
  }).then(res => {
      res.json().then(empresas => {
          console.log(empresas);
          empresas.forEach((e) => {
              let template = `<tr>
                  <td><input type="checkbox"></td>
                  <td>${e.nombreEmpresa}</td>
                  <td>${e.nombreCiudad} / ${e.direccion}</td>
                  <td>${e.emailEmpresa}</td>
                  <td>${e.telefono}</td>
                  <td><button type='button' id="${e.id}" class='btn btn-info btn-sm morado border-0' onclick="location.href='actualizarEmpresa.html'"><span class="material-icons">editar</span></button>
                          <button type='button' class='btn btn-danger btn-sm bg-light moradoletra border-0' onclick="eliminarEmpresa('${e.id}') " ><span class="material-icons")">Eliminar</span></button>
                  </td></tr>`;  
              
                  filas.insertAdjacentHTML('beforeend', template); 
                });
            })
            .catch()
        })
    }else{
        alert("No estás registrado")
    }
};


//eliminar
function eliminarEmpresa(id) {
    console.log(id);
    let Token = sessionStorage.getItem("jwt");
   var valor = parseJwt(Token)
   console.log(valor);
   if(valor){
    fetch(`http://localhost:3000/empresa/${id}`, {
        method: 'DELETE',
        body: `{
        }`,
        headers:{"Content-Type":"application/json"}
}).then(res => {
    res.json().then(data => {
        console.log(data);
        alert(data)
        location.reload();
        });

    }).catch(error => {
        console.log(error);
    });

   } 
}

window.addEventListener("load", ()=>{cargarEmpresas()});


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
