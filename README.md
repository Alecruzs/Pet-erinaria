# Citas Vet

Aplicación simple para gestionar citas de una clínica veterinaria. Permite registrar la información del paciente, el propietario y la fecha de la visita, además de editar o eliminar una cita desde la interfaz.

## ¿Qué hace esta app?

La aplicación tiene una pantalla principal con dos secciones:

- Formulario para crear una nueva cita
- Lista para ver, editar y borrar citas ya registradas

Cada cita incluye:

- nombre de la mascota
- nombre del propietario
- teléfono
- fecha
- hora
- síntomas

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript vanilla
- Node.js + Express para servir la aplicación localmente

## Estructura del proyecto

```text
citasVet/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── cita.js
├── index.html
├── package.json
├── README.md
└── server.js
```

### Descripción rápida de cada archivo

- `index.html`: estructura principal de la interfaz.
- `css/styles.css`: estilos visuales de la página.
- `js/app.js`: lógica del formulario, eventos y flujo principal de la agenda.
- `js/cita.js`: clases `Citas` y `UI` para manejar la colección y la vista.
- `server.js`: sirve la aplicación localmente en el navegador.
- `package.json`: configuración del proyecto y scripts de ejecución.

## Cómo ejecutarlo

1. Abre la terminal en la raíz del proyecto.
2. Ejecuta este comando:

```bash
npm install
```

3. Luego inicia el servidor:

```bash
npm start
```

4. Abre en el navegador esta URL:

```text
http://localhost:4173
```

## Cómo funciona la lógica

La app valida los datos cuando el usuario completa el formulario y da clic en "Crear Cita".

Si todo está bien:

- la cita se guarda en `localStorage` con la clave `citasVet.citas`
- se imprime en la lista
- se limpia el formulario

Al volver a abrir o recargar la aplicación, las citas guardadas se recuperan automáticamente.

También existe la opción de:

- editar una cita ya creada
- eliminar una cita de la lista

La edición se activa cuando se pulsa el botón de editar de una cita concreta. Entonces el formulario se rellena con esa información y se cambia el botón a "Guardar Cambios".

## Estilo del proyecto

La interfaz está pensada para ser clara, ordenada y sencilla de usar. La idea es que el usuario pueda registrar información rápidamente sin perderse entre demasiados elementos visuales.

## Consideraciones

- Las citas se guardan en el `localStorage` del navegador utilizado.
- No hay base de datos ni sincronización entre dispositivos.
- Es una versión ligera y didáctica pensada para aprender el manejo de formularios y manipulación del DOM con JavaScript puro.

## Desarrollo futuro

Se pueden añadir mejoras como:

- agregar filtros por fecha
- validar mejor los campos
- crear un apartado de historial
- añadir diseño responsive más avanzado

## Autor

Proyecto desarrollado para la gestión de citas veterinarias con una estructura fácil de mantener y modificar.
