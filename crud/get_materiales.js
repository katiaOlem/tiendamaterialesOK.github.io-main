function getMateriales() {
    
    
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/materiales/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("content-type", "application/json");
    
    const  card_body   = document.getElementById("card_event");



    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);

        //console.log(json);

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
            Swal.fire({
                icon: 'error',
                title: 'Verifique los datos',
                text: 'Algo salió mal!'
            })
        }
        
        else if (request.status == 202){
            const response = request.responseText;
            const parseo_json = JSON.parse(response);
            //console.log(parseo_json);

            for (var key in parseo_json) {
                for (var id in parseo_json[key]) {
                    //console.log(id);
                    var nombre = parseo_json[key][id].Nombre
                    var lugar = parseo_json[key][id].Lugar
                    var costo = parseo_json[key][id].Costo
                    var descripcion = parseo_json[key][id].Descripcion
                    var imagen = parseo_json[key][id].Imagen


                    card_body.innerHTML += '<div class="col-sm-4">' +
                    '<div class="card-body jumbotron_color2 card1">' +
                    '<h2 class="card-title">' + nombre + '</h2>' +
                    '<br>' +
                    '<li class="btn boton4 btn-lg"> $' + costo + '</li>' +
                    '</ul>' +
                    '<img class="img1" src="' + imagen + '">' +
                    '<p class="card-text">' +
                    '<ul>' +
                    '<li class="parrafos">Lugar: ' + lugar + '</li>' +
                    '</p>' +'<br>' +
                    '<p class="parrafos">' + descripcion + '</p>' +'<br>'+
                    '<a class="btn boton4 btn-lg" href="/templates/ubicacion.html?' + id + '">Ubicación</a>' +
                    '</div>' +
                    '</div>';                
                }
            }

        }
    };
    request.send();
}
