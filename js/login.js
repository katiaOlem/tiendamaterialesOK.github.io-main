function login(){   

    let email = document.getElementById("email");
    let password  = document.getElementById("password");  
    let payload = {
        "email" : email.value,
        "password" : password.value
    }
    /*console.log(email.value);
    console.log(password.value );
    console.log(payload);*/

    var request = new XMLHttpRequest();
    request.open('POST', "http://127.0.0.1:8000/users/token",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(payload.email + ":" + payload.password));
    request.setRequestHeader("Content-Type", "application/json");
 
    
    request.onload = () => {
        let response = request.responseText;
        const json1 = JSON.parse(response);
        console-console.log(json1);
        sessionStorage.setItem("token", json1.token);
        //sessionStorage.setItem("Level", json1.level);
        

        var message1 = json1.message;
        var code1 = json1.code;
        var level = json1.level;
        console.log(message1);
        console.log(code1);
        console.log(level);

        if (code1==201 && message1 == "Usuario autenticado" && level == 1){
            Swal.fire({
                title: message1,
                text: "Ingreso exitoso",
                type: "success"
            }).then(function() {
                window.location = "/admin/templates/materiales.html";
            });
        }

        else if (code1==201 && message1 == "Usuario autenticado" && level == 0){
            Swal.fire({
                title: message1,
                text: "Ingreso exitoso",
                type: "success"
            }).then(function() {
                window.location = "/index.html";
            });
        }
        
        var jsonformateado = response.replace("Error: [Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCuJuJULBMQWVhUWXYEOHsg3FMAEeDRVM0] " , "");
        const json = JSON.parse(jsonformateado);
        var obj = JSON.parse(json);
        var code = obj.error.code;
        var message = obj.error.message;
       //console.log(code);
       console.log(message);
        

        if (code==400 && message == "INVALID_PASSWORD"){
            Swal.fire({
                title: "Contraseña invalida",
                text: "Por favor ingrese una contraseña valida",
                type: "error"
            }).then(function() {
                window.location = "/templates/login.html";
            });
        }
        else if(code==400 && message == "EMAIL_NOT_FOUND"){
            Swal.fire({
                title: "Usuario no encontrado",
                text: "Por favor ingrese un usuario valido",
                type: "error"
            }).then(function() {
                window.location = "/templates/login.html";
            });
        }
        else if(code==400 && message == "INVALID_EMAIL"){                
            Swal.fire({
                title: "Correo invalido",
                text: "Revisar el correo electronico",
                type: "error"
            }).then(function() {
                window.location = "/templates/login.html";
            });
        }
    
    };
    request.send(JSON.stringify(payload));
}