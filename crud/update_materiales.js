function update_materiales() {
    const token = sessionStorage.getItem('token');
    var id = window.location.search.substring(1);
    
   
    let nombre = document.getElementById("nombre");
    let lugar  = document.getElementById("lugar");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    const img = document.getElementById("blah");
    console.log(img);

    const ruta = img.src;

    var payload = {
        "id_material": id,
        "Nombre": nombre.value,
        "Lugar": lugar.value,
        "Descripcion": descripcion.value,
        "Costo": precio.value,
        "Imagen": ruta
    }
    
    var request = new XMLHttpRequest();
    request.open('PUT', "http://127.0.0.1:8000/materiales/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Authorization", "Bearer " +token);
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response);     
        const status    = request.status;
        console.log(json);

        if (request.status === 401 || request.status === 403) {
            Swal.fire({
                title: "Error",
                text: "Iniciar sesión",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/login.html";
            });
        }

        else if (token == "" || token == null    || token == undefined) {
            Swal.fire({
                title: "Error",
                text: "Iniciar sesión",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/login.html";
            });
        }

        else if (request.status == 202){

            console.log("Response: " + response);
            console.log("JSON: " + json);
            console.log("Status: " + status);

            Swal.fire({
                title: json.message,
                text: "",
                type: "info"
            }).then(function() {
                window.location = "/admin/templates/ver_material.html?" + id;
            });
        }
    };
    request.send(JSON.stringify(payload));


    
}



