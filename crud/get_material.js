function ver_material() {

    var id = window.location.search.substring(1);

    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/materiales/"+ id,true);
    request.setRequestHeader("Accept", "apppcation/json");
    request.setRequestHeader("content-type", "apppcation/json");

    const  btn_actualizar   = document.getElementById("btn_actualizar");
    const  btn_eliminar     = document.getElementById("btn_eliminar");
    const  btn_regresar     = document.getElementById("btn_regresar");

    request.onload = () => {
        const response  = request.responseText;
        const json      = JSON.parse(response);

        const status    = request.status;

        var nombref      = json.material.Nombre;
        var addressf     = json.material.Lugar;
        var costof       = json.material.Costo;
        var descripcionf = json.material.Descripcion;
        var imagenf      = json.material.Imagen;

        

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }

        else if (request.status == 202){

            let nombre      = document.getElementById("nombre");
            let lugar       = document.getElementById("lugar");
            let descripcion = document.getElementById("descripcion");
            let precio      = document.getElementById("precio");
            let imagen      = document.getElementById("blah");

            nombre.value = nombref;
            lugar.value = addressf;
            descripcion.value = descripcionf;
            precio.value = costof;
            imagen.src = imagenf;

            btn_actualizar.innerHTML    = '<br><br><br><br><br><br><br><a href="update_material.html?' + id + '" class="btn btn-success btn-block btn-lg">Actualizar</a>';
            btn_eliminar.innerHTML      = '<br><br><br><br><br><br><br><input type="button" value="Eliminar" class="btn btn-danger btn-block btn-lg" onclick="delete_material()">';
            btn_regresar.innerHTML      = '<br><br><br><br><br><br><br><a href="materiales.html" class="btn btn-primary btn-block btn-lg">Regresar</a>';
           
        }

        else if(status==404){
            let nombre      = document.getElementById("nombre");
            let lugar       = document.getElementById("lugar");
            let descripcion = document.getElementById("descripcion");
            let precio      = document.getElementById("precio");
            let imagen      = document.getElementById("imagen");

            nombre.value = "None";
            lugar.value = "None";
            descripcion.value = "None";
            precio.value = "None";
            imagen.src = "None";

            Swal.fire({
                title: "Material no existente",
                text: "Verifique de nuevo",
                type: "info"
            }).then(function() {
                window.location = "/index.html";
            }
            );
        }
    }
    request.send();
}
