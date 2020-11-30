let nombreEmpresa = document.getElementById("inputNombre");
let telefono = document.getElementById("inputTelefono");
let emailEmpresa = document.getElementById("inputEmail");
let id_Ciudad = document.getElementById("selectCiudad");
let direccion = document.getElementById("inputDireccion");
let botonCrear = document.getElementById("botonCrear");
let liUsuarios = document.getElementById("liUsuarios");

window.addEventListener("load", ()=>{
    let Token = sessionStorage.getItem("jwt");
    var valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol===2 || valor.id_tipoRol===3){
        liUsuarios.classList.add("ocultarUsuarios")
    }
});

//Peticion para Agregar Empresa
function agregarEmpresa() {   
    let Token = sessionStorage.getItem("jwt");
    let valor = parseJwt(Token)
    console.log(valor);
    if(valor){
        console.log(typeof(nombreEmpresa.value))
            console.log(typeof(telefono.value))
            console.log(typeof(emailEmpresa.value))
            console.log(typeof(direccion.value))
            console.log(typeof(parseInt(id_Ciudad.value)))

        fetch('http://localhost:3000/empresa', {
          method:'POST',
          body:       
          `{
            "nombreEmpresa": "${nombreEmpresa.value}",
            "telefono": "${telefono.value}",
            "emailEmpresa": "${emailEmpresa.value}",
            "direccion": "${direccion.value}",
            "id_Ciudad": ${parseInt(id_Ciudad.value)}           
        }`,
          headers: {
            "Content-Type":"application/json",           
        
        }}).then(res => {
            res.json().then(data =>{
            console.log(data);
            alert(data);
            location.href = "../empresas/empresas.html";
        })
        });
 
    }else{
        alert("No tiene permiso para realizar esta acción")
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

botonCrear.addEventListener("click", ()=>{agregarEmpresa()});