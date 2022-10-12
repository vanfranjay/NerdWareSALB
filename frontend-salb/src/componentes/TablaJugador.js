
let jugadores =[]

function agregarJugador(){
    let Nombre = document.getElementById("Nom").value
    let Apellido = document.getElementById("Ape").value
    let Fecha_Nac = document.getElementById("Fec").value
    let Telefono = document.getElementById("Tel").value
    let Correo = document.getElementById("Cor").value
    let Rol = document.getElementById("Rol").value
    let DNI = document.getElementById("DNI").value
    let Direccion = document.getElementById("Dir filled-multiline-static").value
    let F_DNI = document.getElementById("F_DNI").value
    let F_Jug = document.getElementById("F_Jug").value

    function CrearTabla(){
        let tabla = <thead><tr><th>Nombre</th><th>Apellido</th><th>Fecha_Nac</th><th>Telefono</th><th>Correo</th><th>Rol</th><th>DNI</th><th>Direccion</th><th>F_DNI</th><th>F_Jug</th></tr></thead>
       for (let i = 0; i < jugadores.length; i++) {
       
        tabla += '<tr><td>${Nombre[i][0]}</td><td>${Apellido[i][1]}</td><td>${Fecha_Nac[i][2]}</td><td>${Telefono[i][3]}</td><td>${Correo[i][4]}</td><td>${Rol[i][5]}</td><td>${DNI[i][6]}</td><td>${Direccion[i][7]}</td><td>${F_DNI[i][8]}</td><td>${F_Jug[i][9]}</td></tr>' 
       }
    }
}