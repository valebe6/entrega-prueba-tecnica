# Portal de equipo con tablero de notas

Aplicación web desarrollada como prueba técnica para la gestión de usuarios, notas compartidas y métricas de un tablero.

## Tecnologías

### Frontend

- Angular
- TypeScript
- Angular CDK
- HTML/CSS

### Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT
- bcrypt

### Otros

- Docker
- Docker Compose
- AWS Lambda
- AWS SAM Local

---

## Funcionalidades

### Autenticación

La aplicación permite:

- Iniciar sesión.
- Cerrar sesión.
- Controlar el acceso mediante JWT.
- Diferenciar entre Administrador y Usuario.
- Bloquear el acceso de usuarios inactivos.

### Administrador

Puede:

- Consultar el dashboard.
- Utilizar el tablero.
- Crear usuarios.
- Editar usuarios.
- Cambiar roles.
- Activar y desactivar usuarios.

Siempre se conserva al menos un administrador activo.

### Usuario

Puede:

- Consultar el dashboard.
- Utilizar el tablero.
- Crear notas.
- Editar notas.
- Eliminar notas.
- Mover notas.

### Tablero

El sistema utiliza un único tablero libre con notas tipo post-it.

Cada nota contiene:

- Título.
- Texto.
- Estado.
- Posición X.
- Posición Y.

Los estados disponibles son:

- Pendiente.
- En curso.
- Hecho.

La posición de una nota se guarda automáticamente al moverla.

La información se mantiene después de recargar la aplicación y después de reiniciar el entorno local mientras no se eliminen los datos persistentes.

### Dashboard

El dashboard muestra:

- Total de notas.
- Notas pendientes.
- Notas en curso.
- Notas hechas.

El cálculo de las métricas utiliza una función Lambda.

---

# Ejecución rápida con Docker

## Requisitos

- Docker
- Docker Compose

No es necesario tener PostgreSQL, Node.js o Angular instalados localmente si se utiliza Docker Compose.

## Levantar el proyecto

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Una vez iniciados los servicios:

Frontend:

```text
http://localhost:4200
```

Backend:

```text
http://localhost:3000
```

## Detener el proyecto

```bash
docker compose down
```

Los datos de PostgreSQL se mantienen mediante un volumen Docker.

Para eliminar también los datos persistentes:

```bash
docker compose down -v
```

> Este último comando elimina la base de datos persistente.

---

# Cuentas de demostración

## Administrador

```text
Email: admin@test.com
Password: Admin123
```

## Usuario

```text
Email: user@test.com
Password: User123
```

El administrador puede acceder a la administración de usuarios.

El usuario normal no tiene acceso a dicha sección.

Los usuarios creados desde la administración pueden iniciar sesión utilizando el correo y contraseña registrados.

---

# Ejecución manual

También es posible ejecutar frontend y backend sin Docker.

Consultar los README específicos:

- `back/README.md`
- `front/README.md`

---

# Arquitectura local

```text
Angular
   |
   v
NestJS API
   |
   v
PostgreSQL

NestJS Dashboard
   |
   v
AWS Lambda
(ejecución local)
```

Docker Compose proporciona los servicios de frontend, backend y PostgreSQL.

La función Lambda puede ejecutarse localmente mediante AWS SAM.

---

# Arquitectura AWS propuesta

La arquitectura preparada para un eventual despliegue es:

```text
                    CloudFront
                        |
                        v
                       S3
                        |
                    Frontend

Browser -------------> EC2
                         |
                      NestJS
                         |
                    PostgreSQL

                         |
                    Dashboard
                         |
                      Lambda
```

- EC2: ejecución de la API.
- Lambda: cálculo de métricas.
- S3: almacenamiento del frontend.
- CloudFront: distribución del frontend.

No se realizó un despliegue remoto en AWS para esta entrega.

---

# Persistencia

PostgreSQL utiliza un volumen Docker:

```text
postgres_data
```

Esto permite conservar los datos después de detener y volver a iniciar los contenedores.

Los datos solamente se eliminan utilizando explícitamente:

```bash
docker compose down -v
```

---

# Limitaciones / pendientes

- No se realizó despliegue remoto en AWS.
- La colaboración en tiempo real no forma parte del alcance.
- No se implementan funcionalidades adicionales fuera del enunciado.

---

# Tiempo empleado

Tiempo efectivo empleado: 10 hrs aprox

---

# Entrega

Repositorio para entrega: https://github.com/valebe6/entrega-prueba-tecnica

Repositorio backend: https://github.com/valebe6/prueba-tecnica-backend

Repositorio frontend: https://github.com/valebe6/prueba-tecnica-frontend

No se realizó despliegue AWS.
