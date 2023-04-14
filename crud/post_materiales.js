function Post_materiales() {


    const token = sessionStorage.getItem('token');
    //console.log(token);

    var request = new XMLHttpRequest(); 
    request.open('POST', "http://127.0.0.1:8000/materiales/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Authorization", "Bearer " +token);
    request.setRequestHeader("Content-Type", "application/json");

    let nombre = document.getElementById("nombre");
    let lugar  = document.getElementById("lugar");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    const img = document.getElementById("blah");
    var ruta = img.src;

    
    let payload = {
        "Nombre": nombre.value,
        "Lugar": lugar.value,
        "Descripcion": descripcion.value,
        "Costo": precio.value,
        "Imagen": ruta

    }


    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response); 
        
        const status    = request.status;
        console.log("Status: " + status);

        if (request.status==400 || request.status == 401 || request.status == 403) {
            Swal.fire({
                title: "Error",
                text: json.detail,
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/login.html";
            }
            );
        }

        else if (request.status == 202){

            var codeapi = json.code;
            var messageapi = json.message;
            var level = json.level;

            console.log(codeapi);

            if (token == null || level == null || codeapi == null){
                Swal.fire({
                    title: "Error",
                    text: "No se ha iniciado sesión",
                    type: "error"
                }).then(function() {
                    window.location = "/admin/templates/login.html";
                }
                );
            }
            else if (codeapi == 201 && messageapi == "Material creado" && level == 1){
                Swal.fire({
                    title: json.message,
                    text: "Redireccionando...",
                    type: "success"
                }).then(function() {
                    window.location = "/admin/templates/materiales.html";
                });
            }

            else if (codeapi != 201 && messageapi != "Material creado" && level == 0){
                Swal.fire({
                    title: json.message,
                    text: "Redireccionando...",
                    type: "error"
                }).then(function() {
                    window.location = "../index.html";
                }
                );
            }
        }
    };
    if (nombre.value == "" || lugar.value == "" || descripcion.value == "" || precio.value == "" || ruta == "https://via.placeholder.com/150"){
        Swal.fire({
            title: "Error",
            text: "Todos los campos son obligatorios",
            type: "error"
        }).then(function() {
            window.location = "/admin/templates/crear_material.html";
        }
        );
    }
    else{
        request.send(JSON.stringify(payload));
    }
}