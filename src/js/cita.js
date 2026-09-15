// Esta clase guarda en memoria todas las citas de la agenda.
class Citas {
    constructor() {
        this.citas = [];
    }

    // Añade una nueva cita a la lista.
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    // Elimina una cita según su id.
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    // Reemplaza una cita existente por la versión actualizada.
    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

// Esta clase se encarga de dibujar mensajes y de pintar la lista de citas en el DOM.
class UI {
    // Muestra una notificación tipo éxito o error.
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('toast', tipo === 'error' ? 'toast-error' : 'toast-success');
        divMensaje.setAttribute('role', 'alert');
        divMensaje.setAttribute('aria-atomic', 'true');

        const texto = document.createElement('span');
        texto.textContent = mensaje;

        const botonCerrar = document.createElement('button');
        botonCerrar.type = 'button';
        botonCerrar.className = 'toast-close';
        botonCerrar.setAttribute('aria-label', 'Cerrar notificación');
        botonCerrar.textContent = 'x';
        botonCerrar.addEventListener('click', () => divMensaje.remove());

        divMensaje.appendChild(texto);
        divMensaje.appendChild(botonCerrar);
        document.querySelector('#toast-container').appendChild(divMensaje);

        requestAnimationFrame(() => divMensaje.classList.add('toast-visible'));

        setTimeout(() => {
            divMensaje.remove();
        }, 4000);
    }

    // Vuelca la colección de citas al contenedor HTML.
    inprimirCitas({ citas }) {
        const contenedorCitas = document.querySelector('#citas');
        this.limpiarHTML(contenedorCitas);

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminaCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });
    }

    // Limpia el contenedor antes de volver a pintar la lista.
    limpiarHTML(contenedorCitas) {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

// Exportamos las clases al window para que app.js pueda usarlas.
window.Citas = Citas;
window.UI = UI;
