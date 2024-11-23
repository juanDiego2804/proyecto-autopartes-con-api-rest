let contadorAutopartes = 1; //Para evitar ids duplicados
let agregarOtraAutoparte = () => {
    let contenido = `
        <div class="row" id="fila-autoparte-${contadorAutopartes}">
            <div class="col-4">
                <label for="autoparte-vender-${contadorAutopartes}" class="form-label">Selecciona la autoparte:</label>
                <select id="autoparte-vender-${contadorAutopartes}" name="autoparte-vender-${contadorAutopartes}" class="form-select">
                    <option selected disabled>Elige...</option>
                </select>
            </div>

            <div class="col-2">
                <label for="cantidad-autoparte-vender-${contadorAutopartes}" class="form-label">Selecciona la cantidad:</label>
                <select id="cantidad-autoparte-vender-${contadorAutopartes}" name="cantidad-autoparte-vender-${contadorAutopartes}" class="form-select">
                    <option selected disabled>Elige...</option>
                </select>
            </div>

            <div class="col-2">
                <label for="subtotal-${contadorAutopartes}" class="form-label">Subtotal:</label>
                <div class="input-group-text">
                    <span>$</span><span id="subtotal-${contadorAutopartes}" class="form-total">0.00</span>
                </div>
            </div>`;

    if(contadorAutopartes<2){//botón para agregar más
        contenido+=`<div class="col-md-3 text-center">
                    <label for="id-autoparte">Agregar otra autoparte</label>
                    <div>
                        <button type="button" id="agregar-autoparte" class="boton-agregar" onclick="agregarOtraAutoparte()">
                            <ion-icon name="add-circle"></ion-icon>
                        </button>
                    </div>
                </div>`;
    }
    contenido+=`</div>`;

    document.getElementById("informacion-autoparte").insertAdjacentHTML("beforeend", contenido);
    contadorAutopartes++; //Incrementar el contador para ids únicos
};

let mostrarFormularioAutoparte = () => {
    document.getElementById("informacion-autoparte").innerHTML = "";
    for (let i = 0; i < 1; i++) {
        agregarOtraAutoparte();
    }
};

window.onload = () => {//se muestra cuando se carga la ventana
    //mostrarFormularioAutoparte();
};


function limpiarPantalla(){
    document.getElementById("nombre-cliente").value="";
    document.getElementById("apellidos-cliente").value="";
    document.getElementById("telefono-cliente").value="";
    //TODO: poner todos los campos que faltan por limpiarse
}

//Enviar datos del cliente a la base de datos
function registrarCliente(){
    const formNombreCliente = document.getElementById("nombre-cliente").value;
    const formApellidosCliente=document.getElementById("apellidos-cliente").value;
    const formTelefonoCliente=document.getElementById("telefono-cliente").value;

    //Validación
    if (!formNombreCliente || !formApellidosCliente || !formTelefonoCliente) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    const apiUrl= "http://localhost:8080/clientes";

    //crear el objeto
    const objetoCliente={
        nombre: formNombreCliente,
        apellidos: formApellidosCliente,
        telefono: formTelefonoCliente
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCliente)
    };

    //Hacer el POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(clienteFromAPI => {
            console.log('Success:', clienteFromAPI);
            //limpiarPantalla(); //TODO: ver si es necesario aquí
        })
        .catch(error => {
            console.error('Error:', error);
            //alert("Hubo un problema al registrar el cliente o venta. Por favor, intenta nuevamente."); TODO: ver si es necesario aquí
        });
}



//función para jalar las autopartes disponibles
let autopartesDisponibles = []; //para almacenar las autopartes cargadas
function cargarAutopartes() {
    const apiUrl = "http://localhost:8080/autopartes";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            autopartesDisponibles = data; //Guardar autopartes
            const selectNombre = document.getElementById("autoparte-vender");//TODO, modificar id
            selectNombre.innerHTML = ""; //Limpiar opciones existentes

            //Agregar una opción inicial
            const defaultOptionNombre = document.createElement("option");
            defaultOptionNombre.textContent = "Elige...";
            defaultOptionNombre.selected = true;
            defaultOptionNombre.disabled = true;
            selectNombre.appendChild(defaultOptionNombre);

            //Llenar opciones con los datos ya registrados
            data.forEach(autoparte => {
                const optionNombre = document.createElement("option");
                optionNombre.value = autoparte.nombre; //nombre del atributo
                optionNombre.textContent = autoparte.nombre;
                selectNombre.appendChild(optionNombre);
            });

            //Agregar listener para actualizar cantidades
            selectNombre.addEventListener("change", actualizarCantidades);
        })
        .catch(error => {
            console.error("Error al cargar las autopartes:", error);
        });
}

function actualizarCantidades() {
    const selectNombre = document.getElementById("autoparte-vender");//TODO, modificar id
    const selectCantidad = document.getElementById("cantidad-autoparte-vender");//TODO, modificar id

    const autoparteSeleccionada = selectNombre.value; //Obtener el nombre de la autoparte seleccionada

    //Encontrar la autoparte seleccionada en el array
    const autoparte = autopartesDisponibles.find(item => item.nombre === autoparteSeleccionada);

    if (autoparte) {
        const cantidadDisponible = autoparte.cantidadEnExistencia; //Obtener la cantidad disponible
        selectCantidad.innerHTML = ""; //Limpiar las opciones actuales

        //Agregar una opción inicial
        const defaultOptionCantidad = document.createElement("option");
        defaultOptionCantidad.textContent = "Elige...";
        defaultOptionCantidad.selected = true;
        defaultOptionCantidad.disabled = true;
        selectCantidad.appendChild(defaultOptionCantidad);

        //Generar opciones  basadas en la cantidad disponible
        for (let i = 1; i <= cantidadDisponible; i++) {
            const optionCantidad = document.createElement("option");
            optionCantidad.value = i;
            optionCantidad.textContent = i;
            selectCantidad.appendChild(optionCantidad);
        }
    }
}

//TODO: realizar sumas del precio



function cargarRfcEmpleados(){//TODO: hay error en empleados, rfcEmpleado no es llave foranea en la segunda tabla
    const apiUrl = "http://localhost:8080/empleados";
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const select = document.getElementById("rfc-empleados");
            select.innerHTML = ""; //Limpiar opciones existentes

            //Agregar una opción inicial
            const defaultOption = document.createElement("option");
            defaultOption.textContent = "Elige...";
            defaultOption.selected = true;
            defaultOption.disabled = true;
            select.appendChild(defaultOption);

            //Llenar opciones con los datos ya registrados
            data.forEach(empleado => {
                const option = document.createElement("option");
                option.value = empleado.rfcEmpleado; //nombre del atributo
                option.textContent = empleado.rfcEmpleado;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los RFC de los empleados:", error);
        });
}

//llamar a las funciónes al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarAutopartes();
    //cargarRfcEmpleados();
});



/*function realizarVenta(){
//llamar a registrarEmpleado()
//eliminar información de la base de datos
}*/

