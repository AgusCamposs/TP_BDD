# TP_BDD

## 1. Software Necesario
-Node.js (v14 o superior)

-Java JDK (v11 o superior)

-PostgreSQL (v12 o superior)

-MongoDB (v5.0 o superior)

-Maven

## 2. Configuración de las Bases de Datos:

### PostgreSQL:
-Crear una base de datos local con PostgreSQL.

-Crear un usuario con permisos para leer y escribir en la base de datos.

### MongoDB:

-Crear una base de datos local con MongoDB.

## 3. Configuración del Backend
### 1. En el directorio del projecto, crear un archivo .env del projecto con la siguiente estructura:

```dotenv
POSTGRES_USERNAME={username}
POSTGRES_PASSWORD={password}
POSTGRES_LOCAL_URL=jdbc:postgresql://localhost:{port}/{database}
POSTGRES_DB={database}
MONGODB_URL=mongodb://localhost:{port}/{database}
```
Con las credenciales utilizadas cuando se configuraron las bases de datos
   Valores por defecto -> username=postgres, port:5432

### 2. Ejecutar el siguiente comando para compilar el proyecto y descargar las dependencias necesarias: 
```mvn clean install```

### 3. Ejecutar el backend con el siguiente comando:
```mvn spring-boot:run```

## 4. Configuración del Frontend (React)
En el directorio del frontend ```front```, instalar las dependencias y ejecutar el frontend con los siguientes comandos:
```
npm install
npm start
```
