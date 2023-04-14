from fastapi import Depends, FastAPI , HTTPException, status, Security
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import pyrebase
from fastapi.middleware.cors import CORSMiddleware
from typing import List


app = FastAPI()


class Respuesta (BaseModel) :  
    message: str  


class Material (BaseModel) :
    Nombre: str
    Lugar: str
    Costo: int
    Descripcion: str
    Imagen: str

class MaterialUpdate (BaseModel) :  
    id_material: str
    Nombre: str
    Lugar: str
    Costo: int
    Descripcion: str
    Imagen: str


class UserIN(BaseModel):
    email       : str
    password    : str
    

origins = [
    "http://0.0.0.0:8000/",
    "http://127.0.0.1:8000/",
    "*",              
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hola"}

firebaseConfig = {
  "apiKey": "AIzaSyDg6py7cZHPkgOHPZ3TdbTC5s6dB70_D9I",
  "authDomain": "rugged-cooler-303905.firebaseapp.com",
  "databaseURL": "https://rugged-cooler-303905-default-rtdb.firebaseio.com",
  "projectId": "rugged-cooler-303905",
  "storageBucket": "rugged-cooler-303905.appspot.com",
  "messagingSenderId": "287132892254",
  "appId": "1:287132892254:web:8fffbe96b2c6ec350f08cf",
  "measurementId": "G-V4K6L1XG4T"
};

firebase = pyrebase.initialize_app(firebaseConfig)


securityBasic  = HTTPBasic()
securityBearer = HTTPBearer()


#Asigna un token para el usuario
@app.post(
    "/users/token",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Asignación de un token para usuario",
    description="Asignación de un token para el usuario",
    tags=["auth"],
)

async def post_token(credentials: HTTPBasicCredentials = Depends(securityBasic)):
    try:
        email = credentials.username
        password = credentials.password
        auth = firebase.auth()
        user = auth.sign_in_with_email_and_password(email, password)
        #trae el level del usuario
        db=firebase.database()
        level = db.child("users").child(user["localId"]).child("level").get().val()
        
        response = {
            "message": "Usuario autenticado",
            "token": user["idToken"],
            "level": level,
            "code": status.HTTP_201_CREATED,
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        return(f"Error: {error}")
    
#Crea un usuario en la base de datos firebase para clientes
@app.post(  "/registro/",  
    status_code=status.HTTP_202_ACCEPTED, 
    summary="Crea un usuario",
    description="Crea un usuario", 
    tags=["auth"]
)
async def create_user(usuario: UserIN ):
    try:
        auth = firebase.auth()
        db=firebase.database()
        user = auth.create_user_with_email_and_password(usuario.email, usuario.password)
        uid = user["localId"]
        db.child("users").child(uid).set({"email": usuario.email, "level": 0 })
        response = {"code": status.HTTP_201_CREATED, "message": "Usuario agregado"}
        return response
    except Exception as error:
        print(f"Error: {error}")
        return(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    
#Crea un usuario en la base de datos firebase para administradores
@app.post(  "/users/",  
    status_code=status.HTTP_202_ACCEPTED, 
    summary="Crea administrador",
    description="Crea administrador", 
    tags=["auth"]
)
async def create_user(usuario: UserIN ):
    try:
        auth = firebase.auth()
        db=firebase.database()
        user = auth.create_user_with_email_and_password(usuario.email, usuario.password)
        uid = user["localId"]
        db.child("users").child(uid).set({"email": usuario.email, "level": 1, "nombre": "admin"})
        response = {"code": status.HTTP_201_CREATED, "message": "Usuario creado"}
        return response
    except Exception as error:
        print(f"Error: {error}")
        return(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )

#Obtiene un usuario por su id
@app.get(
    "/usuarios/{id_usuario}",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Retorna un usuario",
    description="Retorna un usuario"
)
async def get_usuarios(id_usuario: str):
    try:
        db=firebase.database()
        usuario = db.child("users").child(id_usuario).get().val()
        response = {
            "usuario": usuario
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Autentificado",
            headers={"WWW-Authenticate": "Basic"},        
        )
    
#Obtiene una lista de usuarios
@app.get(
    "/usuarios/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Retorna lista de usuarios",
    description="Retorna lista de usuarios"
)
async def get_usuarios():
    try:
        db=firebase.database()
        usuarios = db.child("users").get().val()
        response = {
            "usuarios": usuarios
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Autentificado",
            headers={"WWW-Authenticate": "Basic"},        
        )
    


#Obtiene una lista de materiales registrados
@app.get(
    "/materiales/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Retorna lista Materiales",
    description="Retorna lista Materiales"
)
async def get_materiales():
    try:
        db=firebase.database()
        materiales = db.child("Materiales").get().val()
        response = {
            "materiales": materiales
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Autentificado",
            headers={"WWW-Authenticate": "Basic"},        
        )

#Obtiene solo un material ID
@app.get(
    "/materiales/{id_material}",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Retorna un material",
    description="Retorna un material"
)
async def get_materiales(id_material: str):
    try:
        db=firebase.database()
        material = db.child("Materiales").child(id_material).get().val()
        response = {
            "material": material
        }
        return response
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Autentificado",
            headers={"WWW-Authenticate": "Basic"},        
        )
    
#Agrega un evento 
@app.post("/materiales/",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Agregar un material",
    description="Agregar un material",
    tags=["auth"]
)
async def post_materiales(material: Material, credentials: HTTPAuthorizationCredentials = Depends(securityBearer)):
    try:
        auth = firebase.auth()
        user = auth.get_account_info(credentials.credentials)
        uid  = user["users"][0]["localId"]
        db=firebase.database()
        usuario = db.child("users").child(uid).get().val()
        level = usuario["level"]
    
        if  level == 1:
            db.child("Materiales").push({"Nombre": material.Nombre, "Lugar": material.Lugar, "Costo": material.Costo, "Descripcion": material.Descripcion,"Imagen": material.Imagen})
            response = {
                "code": status.HTTP_201_CREATED, 
                "message": "Material Creado",
                "level": level
                }
            return response
        else:
            detail="No Autorizado",
            return detail
   
    except Exception as error:
        print(f"Error: {error}")
        return(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    
#Actualiza un evento
@app.put(
    "/materiales/",
    response_model=Respuesta,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Actualizar Material",
    description="Actualizar Material",
    tags=["auth"]
)
async def put_materiales(material: MaterialUpdate, credentials: HTTPAuthorizationCredentials = Depends(securityBearer)):
    try:
        auth = firebase.auth()
        user = auth.get_account_info(credentials.credentials)
        uid  = user["users"][0]["localId"]  
        db=firebase.database()
        usuario = db.child("users").child(uid).get().val()
        level = usuario["level"]
        id=material.id_material
        if  level == 1:
            db.child("Materiales").child(id).update({"Nombre": material.Nombre, "Lugar": material.Lugar, "Costo": material.Costo, "Descripcion": material.Descripcion,  "Imagen": material.Imagen})
            response = {
                "message":"Material Actualizado"
            }
            return response
        else:
            detail="No Autorizado",
            return detail   
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED           
        )
    
#Elimina un evento
@app.delete(
    "/materiales/{id_material}",
    response_model=Respuesta,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Elimina Material",
    description="Elimina Material",
    tags=["auth"]
)
async def delete_materiales(id_material: str, credentials: HTTPAuthorizationCredentials = Depends(securityBearer)):
    try:
        auth = firebase.auth()
        user = auth.get_account_info(credentials.credentials)
        uid  = user["users"][0]["localId"]
        db=firebase.database()
        usuario = db.child("users").child(uid).get().val()
        level = usuario["level"]
        if  level == 1:
            db.child("Materiales").child(id_material).remove()
            response = {
                "message":"Material Eliminado"
            }
            return response
        else:
            detail="No Autorizado",
            return detail
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED           
        )