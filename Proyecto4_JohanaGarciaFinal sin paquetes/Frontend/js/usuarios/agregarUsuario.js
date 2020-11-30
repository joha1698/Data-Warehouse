let nombreUsuario = document.getElementById("inputNombre");
let apellidoUsuario = document.getElementById("inputApellido");
let emailUsuario = document.getElementById("inputEmail");
let id_tipoRol = document.getElementById("inputPerfil");
let contrasena = document.getElementById("inputContraseña");
let inputContrasena2 = document.getElementById("inputContraseña2");
let botonCrear = document.getElementById("botonCrear")

//Peticion para Agregar Usuario
function comenzar() {   
    let Token = sessionStorage.getItem("jwt");
    let valor = parseJwt(Token)
    console.log(valor);
    if(valor.id_tipoRol == 1){
        if(contrasena.value === inputContrasena2.value ){
        fetch('http://localhost:3000/usuarios', {
          method:'POST',
          body:       
          `{
            "nombreUsuario": "${nombreUsuario.value}",
            "apellidoUsuario": "${apellidoUsuario.value}",
            "emailUsuario": "${emailUsuario.value}",
            "contrasena": "${contrasena.value}",
            "id_tipoRol": ${id_tipoRol.value}           
        }`,
          headers: {
            "Content-Type":"application/json",           
        
        }}).then(res => {
            res.json().then(data =>{
            console.log(data);
            alert(data);
            location.href = "../usuarios/usuarios.html";
        })
        }); 
        }else{
            alert("Las contraseñas no coinciden")
        }
    }else{
        alert("No tienes permiso para crear un nuevo usuario")
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

botonCrear.addEventListener("click", ()=>{comenzar()});