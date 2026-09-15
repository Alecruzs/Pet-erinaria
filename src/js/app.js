// Este archivo controla la lógica principal de la agenda.
// Aquí se leen los campos del formulario, se validan los datos y se guardan o editan las citas.

// Selección de los elementos del formulario.
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Indicador para saber si estamos editando una cita existente.
let editar;

// Instancias de las clases encargadas de guardar y mostrar las citas.
const administraCitas = new Citas();
const useri = new UI();

// Objeto temporal con los valores del formulario.
const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

// Se asignan eventos a cada campo y al envío del formulario.
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
    formulario.addEventListener('submit', nuevaCita);
}

// Cada vez que el usuario escribe, se actualiza el objeto de la cita.
function datosCita(e) {
    citasObj[e.target.name] = e.target.value;
}

// Validaciones del formulario para evitar datos incorrectos.
function validarCita({ mascota, propietario, telefono, fecha, hora, sintomas }) {
    const nombreValido = /^[\p{L}]+(?:[ '\u002D][\p{L}]+)*$/u;
    const telefonoNormalizado = telefono.replace(/[\s().\u002D]/g, '');

    if (!nombreValido.test(mascota) || mascota.length > 50) {
        return 'El nombre de la mascota solo puede contener letras y separadores, y no superar 50 caracteres';
    }

    if (!nombreValido.test(propietario) || propietario.length > 80) {
        return 'El nombre del propietario solo puede contener letras y separadores, y no superar 80 caracteres';
    }

    if (!/^\+?\d{7,15}$/.test(telefonoNormalizado)) {
        return 'El teléfono debe contener entre 7 y 15 dígitos';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return 'Selecciona una fecha válida';
    }

    const fechaSeleccionada = new Date(`${fecha}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [anio, mes, dia] = fecha.split('-').map(Number);

    const fechaReal = fechaSeleccionada.getFullYear() === anio
        && fechaSeleccionada.getMonth() === mes - 1
        && fechaSeleccionada.getDate() === dia;

    if (!fechaReal || fechaSeleccionada < hoy) {
        return 'La fecha no puede ser anterior a hoy';
    }

    if (fechaSeleccionada.getDay() === 0 || fechaSeleccionada.getDay() === 6) {
        return 'Las citas solo se pueden reservar de lunes a viernes';
    }

    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(hora)) {
        return 'Selecciona una hora válida';
    }

    const [horas, minutos] = hora.split(':').map(Number);
    const minutosDeLaCita = horas * 60 + minutos;

    if (minutosDeLaCita < 570 || minutosDeLaCita > 1140) {
        return 'El horario disponible es de 09:30 a 19:00';
    }

    if (fechaSeleccionada.getTime() === hoy.getTime()) {
        const horaSeleccionada = new Date();
        horaSeleccionada.setHours(horas, minutos, 0, 0);

        if (horaSeleccionada <= new Date()) {
            return 'La hora debe ser posterior a la hora actual';
        }
    }

    if (sintomas.length < 10 || sintomas.length > 500) {
        return 'Los síntomas deben tener entre 10 y 500 caracteres';
    }

    return '';
}

// Al enviar el formulario, se valida y se decide si se crea o se edita la cita.
function nuevaCita(e) {
    e.preventDefault();

    Object.keys(citasObj).forEach(campo => {
        if (typeof citasObj[campo] === 'string') {
            citasObj[campo] = citasObj[campo].trim();
        }
    });

    const mensajeError = validarCita(citasObj);

    if (mensajeError) {
        useri.imprimirAlerta(mensajeError, 'error');
        return;
    }

    if (editar) {
        useri.imprimirAlerta('Editado Correctamente');
        administraCitas.editarCita({ ...citasObj });
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editar = false;
        useri.imprimirAlerta('Datos actualizados correctamente');
    } else {
        citasObj.id = Date.now();
        administraCitas.agregarCita({ ...citasObj });
        useri.imprimirAlerta('Se agregó correctamente');
    }

    formulario.reset();
    reiniciarObjeto();
    useri.inprimirCitas(administraCitas);
}

// Vuelve a dejar el objeto vacío tras guardar o editar una cita.
function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

// Borra una cita concreta según su id.
function eliminaCita(id) {
    administraCitas.eliminarCita(id);
    useri.imprimirAlerta('La cita se elimino correctamente');
    useri.inprimirCitas(administraCitas);
}

// Carga los datos de una cita en el formulario para poder editarlos.
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editar = true;
}

eventListeners();