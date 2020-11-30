//trayendo los elementos del DOM
let nombreContacto = document.getElementById("inputNombre");
let apellidoContacto = document.getElementById("inputApellido");
let cargoContacto = document.getElementById("inputCargo");
let emailContacto = document.getElementById("inputEmail");
let id_Empresa = document.getElementById("selectEmpresa");
let id_Ciudad = document.getElementById("selectCiudad");
let id_direccionContacto = document.getElementById("inputDireccion")
let interes = document.getElementById("selectInteres");
let canalDeContacto = document.getElementById("selectCanal");
let cuentaUsuario = document.getElementById("inputCuenta");
let preferencias = document.getElementById("selectPreferencias");
let botonCancelar = document.getElementById("cancelar");
let botonGuardar2 = document.getElementById("guardar2");
let resp = document.getElementById("resp");
let liUsuarios = document.getElementById("liUsuarios");

window.addEventListener("load", ()=>{
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol===2 || valor.id_tipoRol===3){
        liUsuarios.classList.add("ocultarUsuarios")
    }
});

  
//Peticion para Agregar Contacto
function iniciar() {   
    let Token = sessionStorage.getItem("jwt");
    let valor = parseJwt(Token)
    console.log(valor);
    if(valor){
        fetch('http://localhost:3000/contacto', {
          method:'POST',
          body:       
          `{
            "nombreContacto": "${nombreContacto.value}",
            "apellidoContacto": "${apellidoContacto.value}",
            "cargoContacto": "${cargoContacto.value}",
            "emailContacto": "${emailContacto.value}",
            "id_Empresa": ${parseInt(id_Empresa.value)},
            "id_Ciudad": ${parseInt(id_Ciudad.value)},
            "id_direccionContacto": "${id_direccionContacto.value}",
            "interes": "${interes.value}",
            "canalDeContacto": "${canalDeContacto.value}",
            "cuentaUsuario": "${cuentaUsuario.value}",
            "preferencias": "${preferencias.value}"
        }`,
          headers: {
            "Content-Type":"application/json",           
        }            
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
               alert(data) 
            location.href = "../../html/contactos/contactos.html"; 
            })
        }else {
            res.status == 409
            res.json().then(data=>{
            alert(data)
            })}
        });
    }else{
        alert("No estás registrado")
    };        
}

function parseJwt (token) {
     var base64Url = token.split('.')[1];
     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
     return JSON.parse(jsonPayload);
};

botonGuardar2.addEventListener("click", iniciar);

