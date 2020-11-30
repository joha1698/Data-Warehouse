let botonIngreso = document.getElementById("botonIngreso");
let emailUsuario = document.getElementById("inputEmail");
let contrasena = document.getElementById("inputPassword");
let resp = document.getElementById("resp");

botonIngreso.addEventListener("click", ()=>{iniciar()});

function iniciar() {
    sessionStorage.clear();

    fetch('http://localhost:3000/login', {
        method:'POST',
       body:`{
           "emailUsuario":"${emailUsuario.value}",
            "contrasena":"${contrasena.value}"}`,
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            sessionStorage.setItem("jwt", data);
            location.href = "../html/contactos/contactos.html";
            });
        } else {
            emailUsuario.value = "";
            contrasena.value = "";
            resp.textContent = "Usuario o contraseña incorrecto";
        }
    });
}


