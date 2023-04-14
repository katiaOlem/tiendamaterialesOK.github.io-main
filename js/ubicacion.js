function ubicacion_google_maps() {

    var id = window.location.search.substring(1);
    //console.log("id: " + id);

    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/materiales/"+ id,true);
    request.setRequestHeader("Accept", "apppcation/json");
    request.setRequestHeader("content-type", "apppcation/json");

    const  card_body   = document.getElementById("content");

    request.onload = () => {
        const response  = request.responseText;
        const json      = JSON.parse(response);

        const status    = request.status;


        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }

        else if (request.status == 202){

            var nombre      = json.material.Nombre;
            var address     = json.material.Lugar;
            var costo       = json.material.Costo;
            var descripcion = json.material.Descripcion;
            var imagen      = json.material.Imagen;
                 
                //console.log(address);

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode( { 'address': address}, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        
                        var uluru = {lat: latitude, lng: longitude};
                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 50,
                            center: uluru
                        });
                        var marker = new google.maps.Marker({
                            position: uluru,
                            map: map,
                            title: 'Hello World!'
                        });
                    } 
                }); 

    
                
            }
    }
    request.send();
}

    