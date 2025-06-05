**Deno Deploy:** `short-badger-49.deno.dev`

**Examen Práctico – Harry Potter Favorites App (versión breve)**

Crea una aplicación web con Deno Fresh que implemente las siguientes funcionalidades:

---

## 1. Autenticación y Middleware

1. **Página principal (`/`)**

   * Muestra un formulario para **registro** y otro para **login** (email + contraseña).
   * Al registrarse o hacer login, se guarda en MongoDB un usuario con campos básicos (`email`, `password` hasheada, `name`).
   * Se debe generar/almacenar una **cookie de sesión** (por ejemplo, un JWT o un identificador único) que luego será leída por el middleware.

2. **Middleware (`_middleware.ts`)**

   * Detecta la cookie en cada petición y valida la sesión contra MongoDB.
   * Si no existe o es inválida, redirige a `/` (login/registro).
   * Si es válida, inyecta en el contexto (`ctx.state`) el `userId` y permite continuar.

---

## 2. Layout Global

* Crea un archivo `_layout.tsx` que incluya un **header** y un **footer** comunes en todas las páginas (logo “HP Favorites”, enlaces a “Personajes”, “Favoritos” y “Mi Perfil”).
* Dentro de `body`, renderiza la parte específica de cada ruta.

---

## 3. Listado de Personajes y Favoritos

1. **Ruta `/characters`**

   * Se accede **solo si** el middleware ha validado la sesión.
   * Hace una petición **server-side** a `https://hp-api.onrender.com/api/characters`.
   * Muestra una **rejilla de tarjetas** (flexbox) con:
     * Foto (imagen), nombre y casa de cada personaje.
     * Un botón “⭐ Favorito”/“❌ Quitar” en cada tarjeta.
   * Al hacer clic en “Favorito” o “Quitar”, se realiza un `POST` vía Axios a un endpoint interno:
   * Ese endpoint alterna (crea o borra) la entrada correspondiente en una colección MongoDB `favorites`.

2. **Ruta `/favorites`**

   * También protegida por middleware.
   * Recupera desde MongoDB todos los `favorites` de tipo `character` para el `userId` de la sesión.
   * Por cada favorito, muestra la misma tarjeta del personaje (nombre, foto, casa), con botón para “Quitar favorito” (igual que en `/characters`).

---

## 4. Ruta Dinámica Adicional

Crea una ruta dinámica de prueba, por ejemplo:

* **`/house/[houseName]`**

  * Donde `[houseName]` puede ser `gryffindor`, `slytherin`, `ravenclaw` o `hufflepuff`.
  * Al cargar la página, el servidor realiza un **fetch** a `https://hp-api.onrender.com/api/characters/house/:houseName`.
  * Muestra solo los personajes de esa casa en un layout similar al de `/characters`.
  * Incluye el botón de “Favorito” que funciona igual (usa el mismo endpoint interno).

---

## 5. Perfil de Usuario (Opcional)

Como extra, puedes crear una ruta:

* **`/profile`**

  * Muestra información básica del usuario (email, nombre) obtenida de MongoDB.
  * Permite “cerrar sesión” (borrar cookie) y redirigir a `/`.

---

## Requisitos Técnicos / Puntos a Evaluar

1. **Autenticación y sesiones** (login/registro + cookie + middleware) – 3 ptos
2. **Listado SSR de personajes con botones de favorito** – 2 ptos
3. **Listado de favoritos propio** – 2 ptos
4. **Ruta dinámica `/house/[houseName]`** – 1 pto
5. **Layout global (header + footer)** – 1 pto
6. **Integración MongoDB para sesiones y favoritos** – 3 ptos
7. **Buenas prácticas de Fresh y código limpio** – 1 pto

> **Total:** 13 ptos (se califica sobre 10).
