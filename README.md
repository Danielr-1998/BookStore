Paso a Paso para Ejecutar el Proyecto
1. Clonar el Repositorio
Primero, clonar el repositorio en tu máquina local usando el siguiente comando:


git clone https://github.com/tuusuario/gestion-citas.git
cd gestion-citas

2. Instalar las Dependencias del Backend (Laravel)
2.1 Instalar PHP y Composer

Asegúrate de tener PHP (>= 8.x) y Composer instalados. 

2.2 Instalar las Dependencias de Laravel
Una vez dentro del directorio del proyecto (gestion-citas), instala las dependencias del backend utilizando Composer:


composer install
Este comando descargará todas las dependencias necesarias de Laravel.

2.3 Configurar el Archivo .env

2.4 Generar la Clave de la Aplicación
Laravel requiere una clave única para la aplicación, puedes generarla con el siguiente comando:


2.5 Ejecutar las Migraciones


php artisan migrate --seed
Esto creará las tablas necesarias en la base de datos y ejecutará los seeder (si están definidos).

2.6 Iniciar el Servidor de Desarrollo de Laravel
Ahora, puedes iniciar el servidor de desarrollo de Laravel con el siguiente comando:


php artisan serve
Este comando iniciará un servidor de desarrollo en http://127.0.0.1:8000. Ahora podrás acceder a la API del backend.

3. Instalar las Dependencias del Frontend (React/Vue)
3.1 Instalar Node.js
Asegúrate de tener Node.js (>= 14.x) y npm o yarn instalados en tu máquina. Si no los tienes, instálalos:

Node.js: Instrucciones de instalación de Node.js
npm (incluido con Node.js) 

3.2 Instalar las Dependencias del Frontend
El frontend está construido con React.js y Vue.js . 
Instala las dependencias correspondientes:


npm install


3.3 Configurar Inertia.js (Si es necesario)
Si el proyecto utiliza Inertia.js para integrar React/Vue con Laravel, asegúrate de que está correctamente configurado. Inertia.js actúa como un intermediario entre el backend de Laravel y el frontend de React/Vue. Verifica si tienes configurado el siguiente archivo en el backend:



4. Compilar el Frontend
Compila los activos del frontend para producción o desarrollo, dependiendo de lo que necesites:


npm run dev


6. Acceder a la Aplicación

Backend (Laravel API): http://127.0.0.1:8000
Frontend (React/Vue): http://localhost:3000
7. Autenticación de Usuarios

Registrar un usuario a través del formulario de frontend.

8. Operaciones Comunes
Crear una nueva reserva: Utilizando el formulario en el frontend para crear citas y verlas reflejadas en el backend.
