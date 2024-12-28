# Paso a Paso para Ejecutar el Proyecto

## 1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local usando el siguiente comando:

git clone https://github.com/Danielr-1998/BookStore
cd gestion-citas

## 2. Instalar las Dependencias del Backend (Laravel)

### 2.1 Instalar PHP y Composer
Asegúrate de tener PHP (>= 8.x) y Composer instalados.

- **PHP**: [Instrucciones de instalación de PHP](https://www.php.net/manual/es/install.php)
- **Composer**: [Instrucciones de instalación de Composer](https://getcomposer.org/download/)

### 2.2 Instalar las Dependencias de Laravel
Una vez dentro del directorio del proyecto (`gestion-citas`), instala las dependencias del backend utilizando Composer:

composer install

Este comando descargará todas las dependencias necesarias de Laravel.

### 2.3 Configurar el Archivo `.env`
Copia el archivo de configuración `.env.example` a `.env`:

cp .env.example .env

Abre el archivo `.env` y configura las credenciales de la base de datos.

### 2.4 Generar la Clave de la Aplicación
Laravel requiere una clave única para la aplicación, puedes generarla con el siguiente comando:

php artisan key:generate

Este comando generará una nueva clave para la aplicación y la establecerá en tu archivo `.env`.

### 2.5 Ejecutar las Migraciones
Para crear las tablas de la base de datos y poblarla con datos de prueba (si hay seeders definidos), ejecuta:

php artisan migrate --seed

### 2.6 Iniciar el Servidor de Desarrollo de Laravel
Ahora, puedes iniciar el servidor de desarrollo de Laravel con el siguiente comando:

php artisan serve

Este comando iniciará un servidor de desarrollo en `http://127.0.0.1:8000`. Ahora podrás acceder a la API del backend.

## 3. Instalar las Dependencias del Frontend (React/Vue)

### 3.1 Instalar Node.js
Asegúrate de tener **Node.js** (>= 14.x) y **npm** o **yarn** instalados en tu máquina.

- **Node.js**: [Instrucciones de instalación de Node.js](https://nodejs.org/)
- **npm** (incluido con Node.js) 

### 3.2 Instalar las Dependencias del Frontend
El frontend está construido con **React.js** y **Vue.js**. Instala las dependencias correspondientes:

npm install
