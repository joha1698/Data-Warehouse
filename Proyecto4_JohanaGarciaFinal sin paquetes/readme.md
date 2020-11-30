Data WareHouse Johana García

Para ejecutar el proyecto continua los siguientes pasos:

1. Se deben instalar las siguientes aplicacines: 
    -visual studio code 
    -Node.js

2. Crear pack.json ejecutando el comando npm init, ten encuenta que el archivo principal se llama index.js

3. Ejecutar la libreria express en la consola con npm i express

4. Ejecutar la libreria MySQL2 en la consola con npm i mysql2, o mariadb con el comando npm i mariadb

5. Ejecutar la libreria sequelize en la consola con npm i sequelize

6. Ejecutar la libreria dotenv en la consola con npm i dotenv

7. Ejecutar la libreria helmet en la consola con npm i helmet

8. Ejecutar la libreria jsonwebtoken en la consola con npm i jsonwebtoken

9. Digitar los datos de la conexión de la base de datos en el archivo .env A continuación dejo un ejemplo de como se deben nombrar las variables:
    u=root
    c=saimoN16
    secreto=contrasena123

10. Ejecutar el script creacionTablas.sql en la base de datos, este archivo está adjunto en el proyecto

11. Ejecutar el script insercionDatos.sql en la base de datos, este archivo está adjunto en el proyecto 

12. Desde visual studio code ejecutar en la terminar para iniciar la aplicación: 
    -node cd backend 
    -node cd js
    -node index.js


13. La manera de comenzar a explorar la aplicación será abriendo en el navegador el archivo  index.html aquí te podrás logear con cualquiera de las cuentas de usuarios que ya se habían cargado en la base de datos, pero te sugiero comenzar con esta ya que es una cuenta de adminitrador:
    -Usuario: johana@garcia.com
    -Contraseña: abcde