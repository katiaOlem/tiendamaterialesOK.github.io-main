function PostRegUser(){

    let email = document.getElementById("email");
    let password  = document.getElementById("password");  
    let payload = {
        "email" : email.value,
        "password" : password.value
    }
    

    var request = new XMLHttpRequest();
    request.open('POST', "http://127.0.0.1:8000/registro/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
 
    request.onload = () => {
        let response = request.responseText;

        const json1 = JSON.parse(response);
        console-console.log(json1);

        var message1 = json1.message;
        var code1 = json1.code;
        console.log(message1);

        if (code1 ==201 && message1 == "Usuario creado"){
            Swal.fire({
                title: "Registro exitoso",
                text: "Bienvenido",
                type: "success",
            }).then(function() {
                window.location = "/templates/login.html";
            });
        }
        
        var jsonformateado = response.replace("Error: [Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCuJuJULBMQWVhUWXYEOHsg3FMAEeDRVM0] " , "");
        const json = JSON.parse(jsonformateado);
        var obj = JSON.parse(json);
        var code = obj.error.code;
        var message = obj.error.message;
        console.log(obj.error.code);
        console.log(obj.error.message);
        
        if (code==400 && message == "EMAIL_EXISTS"){
            Swal.fire({
                title: "El email ya existe",
                text: "Por favor ingrese otro email",
                type: "error"
            }).then(function() {
                window.location = "/templates/registro.html";
            });
        }  
        else if(code==400 && message== "INVALID_EMAIL"){                
            Swal.fire({
                title: "Correo invalido",
                text: "Revisar el correo electronico",
                type: "error"
            }).then(function() {
                window.location = "/templates/registro.html";
            });
        }
        else if(code==400 && message == "WEAK_PASSWORD : Password should be at least 6 characters"){
                                
            Swal.fire({
                title: "La contraseña debe tener al menos 6 caracteres",
                text: "Ingresa una contraseña mas fuerte ",
                type: "error"
            }).then(function() {
                window.location = "/templates/registro.html";
            });
        }
        else if(code==400 && message == "MISSING_EMAIL"){
            Swal.fire({
                title: "El email es requerido",
                text: "Ingresa un email",
                type: "error"
            }).then(function() {
                window.location = "/templates/registro.html";
            });
        }
        else if(code==400 && message == "MISSING_PASSWORD"){
            Swal.fire({
                title: "La contraseña es requerida",
                text: "Ingresa una contraseña",
                type: "error"
            }).then(function() {
                window.location = "/templates/registro.html";
            });
        }
    };
    request.send(JSON.stringify(payload));
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function PostRegUser_Admin(){

    let email = document.getElementById("email");
    let password  = document.getElementById("password");  
    let payload = {
        "email" : email.value,
        "password" : password.value
    }
    

    var request = new XMLHttpRequest();
    request.open('POST', "http://127.0.0.1:8000/users/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
 
    request.onload = () => {
        let response = request.responseText;

        const json1 = JSON.parse(response);
        console-console.log(json1);

        var message1 = json1.message;
        var code1 = json1.code;
        var level = json1.level;
        console.log(message1);

        if (code1 ==201 && message1 == "Usuario creado"){
            Swal.fire({
                title: "Registro exitoso",
                text: "Bienvenido",
                type: "success",
            }).then(function() {
                window.location = "/admin/templates/login.html";
            });
        }
        
        var jsonformateado = response.replace("Error: [Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCuJuJULBMQWVhUWXYEOHsg3FMAEeDRVM0] " , "");
        const json = JSON.parse(jsonformateado);
        var obj = JSON.parse(json);
        var code = obj.error.code;
        var message = obj.error.message;
        console.log(obj.error.code);
        console.log(obj.error.message);
        
        if (code==400 && message == "EMAIL_EXISTS"){
            Swal.fire({
                title: "El email ya existe",
                text: "Por favor ingrese otro email",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/registro.html";
            });
        }  
        else if(code==400 && message== "INVALID_EMAIL"){                
            Swal.fire({
                title: "Correo invalido",
                text: "Revisar el correo electronico",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/registro.html";
            });
        }
        else if(code==400 && message == "WEAK_PASSWORD : Password should be at least 6 characters"){
                                
            Swal.fire({
                title: "La contraseña debe tener al menos 6 caracteres",
                text: "Ingresa una contraseña mas fuerte ",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/registro.html";
            });
        }
        else if(code==400 && message == "MISSING_EMAIL"){
            Swal.fire({
                title: "El email es requerido",
                text: "Ingresa un email",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/registro.html";
            });
        }
        else if(code==400 && message == "MISSING_PASSWORD"){
            Swal.fire({
                title: "La contraseña es requerida",
                text: "Ingresa una contraseña",
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/registro.html";
            });
        }
    };
    request.send(JSON.stringify(payload));
}