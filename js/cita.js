//crear selectores
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
let editar;

class citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);//para ir viendo las citas guardadas

    }


    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class ui{
    imprimirAlerta(mensaje, tipo) {
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        //mostrar el mensaje de error
        divMensaje.textContent = mensaje;
        //agregar el mensaje al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }

    inprimirCitas({citas}) {
        //console.log("imprimir citas");
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;   
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            //ESTOY CREANDO UN ATRIBUTO PERSONALIZADO
            divCita.dataset.id = id;

            //generar los textos

            const mascotaParrafo = document.createElement('h2');    
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;


            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`    

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`  
            
            
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
    
    limpiarHTML() {
     while(contenedorCitas.firstChild) {
     contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
    
}
const administraCitas = new citas();
const useri = new ui();





//crea eventos 
eventListeners();
function eventListeners() {
 mascotaInput.addEventListener('input', datosCita);
 propietarioInput.addEventListener('input', datosCita);
 telefonoInput.addEventListener('input', datosCita);
 fechaInput.addEventListener('input', datosCita);
 horaInput.addEventListener('input', datosCita);
 sintomasInput.addEventListener('input', datosCita);
 formulario.addEventListener('submit', nuevaCita);
}


//ESTRUCTURA PARA GUARDAR LA INFORMACION

const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
    
};

function datosCita(e) {
    //guardar los valores dentro del objeto
    citasObj[e.target.name] = e.target.value;
    console.log(citasObj);
}   

function nuevaCita(e) {
    //validar nuevaCita
    e.preventDefault();

    // extraer la informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

    //VALIDAR
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        //console.log('Todos los campos son obligatorios');
        useri.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

        if(editar) {
        // Mensaje de editado correctamente
        useri.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita a edición
        administraCitas.editarCita({...citasObj});

        // Regresar el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar modo edición
        editar = false;
        
        //mensaje de datos correctos
        useri.imprimirAlerta('Datos actualizados correctamente');

    }else { 
        // Generar un ID único
        citasObj.id = Date.now();

        // Creando una nueva cita
        administraCitas.agregarCita({...citasObj});

        // Mensaje de agregado correctamente
        useri.imprimirAlerta('Se agregó correctamente');
    }


   
  //reiniciar el formulario
  formulario.reset();
  reiniciarObjeto();
  useri.inprimirCitas(administraCitas);
}
function reiniciarObjeto() {
    citasObj.mascota = '';
    citasObj.propietario = '';
    citasObj.telefono = '';
    citasObj.fecha = '';
    citasObj.hora = '';
    citasObj.sintomas = '';
}

function eliminaCita(id) {
    //eliminar la cita
    administraCitas.eliminarCita(id);   

    //mostrar mensaje
    useri.imprimirAlerta('La cita se elimino correctamente');

    //actualizar
    useri.inprimirCitas(administraCitas);
}

// Carga los datos y el modo edición
function cargarEdicion(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto
    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;

    // Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    // Añadir modo edición
    editar = true;
}
