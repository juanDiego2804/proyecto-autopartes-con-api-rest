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

    cargarAutopartes(contadorAutopartes);
    contadorAutopartes++; //Incrementar el contador para ids únicos
};

let mostrarFormularioAutoparte = () => {
    document.getElementById("informacion-autoparte").innerHTML = "";
    for (let i = 0; i < 1; i++) {
        agregarOtraAutoparte();
    }
};

window.onload = () => {//se muestra cuando se carga la ventana
    mostrarFormularioAutoparte();
};


function limpiarPantalla() {
    document.getElementById("nombre-cliente").value="";
    document.getElementById("apellidos-cliente").value="";
    document.getElementById("telefono-cliente").value="";
    // Limpiar dinámicamente las autopartes existentes
    const filasAutopartes = document.querySelectorAll("[id^='fila-autoparte-']");
    filasAutopartes.forEach(fila => {
        const selectAutoparte = fila.querySelector("select[id^='autoparte-vender-']");
        const selectCantidad = fila.querySelector("select[id^='cantidad-autoparte-vender-']");
        const subtotal = fila.querySelector("span[id^='subtotal-']");

        if (selectAutoparte) selectAutoparte.value = "";
        if (selectCantidad) selectCantidad.value = "";
        if (subtotal) subtotal.textContent = "0.00";
    });

    // Restablecer total general
    document.getElementById("total").textContent = "0.00";
    document.getElementById("rfc-empleados").innerHTML = "<option selected disabled>Elige...</option>";

    contadorAutopartes=1;
    // Restablecer la sección dinámica de autopartes
    mostrarFormularioAutoparte();
}


//función para jalar las autopartes disponibles
let autopartesDisponibles = []; //para almacenar las autopartes cargadas
function cargarAutopartes(idAutoparte) {
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
            const selectNombre = document.getElementById(`autoparte-vender-${idAutoparte}`);//TODO, modificar id
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
            selectNombre.addEventListener("change", () => actualizarCantidades(idAutoparte));
        })
        .catch(error => {
            console.error("Error al cargar las autopartes:", error);
        });
}

function actualizarCantidades(idAutoparte) {
    const selectNombre = document.getElementById(`autoparte-vender-${idAutoparte}`);//TODO, modificar id
    selectNombre.addEventListener("change", () => {
        actualizarCantidades(); //Para actualizar las cantidades disponibles
        obtenerSubtotal(idAutoparte); //Para reiniciar el subtotal
    });

    const selectCantidad = document.getElementById(`cantidad-autoparte-vender-${idAutoparte}`);//TODO, modificar id
    selectCantidad.addEventListener("change", () => obtenerSubtotal(idAutoparte));

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


function obtenerSubtotal(idAutoparte){
    //Obtener el nombre y cantidad de la autoparte seleccionada
    let nombreAutoparte = document.getElementById(`autoparte-vender-${idAutoparte}`).value;
    let cantidadAutoparte = parseInt(document.getElementById(`cantidad-autoparte-vender-${idAutoparte}`).value);

    //Validar que se haya seleccionado una autoparte y una cantidad válida
    if (!nombreAutoparte || isNaN(cantidadAutoparte)) {
        console.error("Debes seleccionar una autoparte y una cantidad válida.");
        return;
    }

    // Encontrar la autoparte seleccionada en el array
    let autoparte = autopartesDisponibles.find(item => item.nombre === nombreAutoparte);

    if (!autoparte) {
        console.error("No se encontró la autoparte seleccionada.");
        return;
    }

    //Calcular el subtotal
    let precioUnitario = autoparte.precioUnitario;
    let subtotal = precioUnitario * cantidadAutoparte;
    document.getElementById(`subtotal-${idAutoparte}`).innerHTML = subtotal.toFixed(2);
}

function obtenerTotal() {
    let total = 0;
    for (let i = 1; i <= contadorAutopartes; i++) {
        const subtotalElemento = document.getElementById(`subtotal-${i}`);
        if (subtotalElemento) {
            let subtotal = parseFloat(subtotalElemento.innerHTML);
            if (!isNaN(subtotal)) {
                total += subtotal;
            }
        }
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
}
setInterval(obtenerTotal, 100);//Actualizar el total automáticamente cada 100ms


function cargarRfcEmpleados() {//TODO: hay error en empleados, rfcEmpleado no es llave foranea en la segunda tabla
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
    cargarRfcEmpleados();
});


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


//TODO enviar datos y realizar la venta
const apiCliente = "http://localhost:8080/clientes";
async function realizarVenta(){

    registrarCliente();
    //Obtener el id del cliente
    let formIdCliente=0;

    /*const respuestaCliente = await fetch(apiCliente);
    if(!respuestaCliente.ok){
        throw new Error("Respuesta de red no fue ok");
    }
    const clientesDesdeBD = await respuestaCliente.json();
    // Obtener el id más alto directamente
    formIdCliente = Math.max(...clientesDesdeBD.map(cliente => cliente.idCliente));//TODO validar*/
    try {
        const respuestaCliente = await fetch(apiCliente);
        if (!respuestaCliente.ok) {
            throw new Error("Respuesta de red no fue ok");
        }

        const clientesDesdeBD = await respuestaCliente.json();

        // Validar si es un arreglo y si tiene elementos
        if (Array.isArray(clientesDesdeBD) && clientesDesdeBD.length > 0) {
            formIdCliente = Math.max(
                0, ...clientesDesdeBD.filter(cliente => cliente.idCliente !== undefined).map(cliente => cliente.idCliente)
            );
        }
    } catch (error) {
        console.error("Error al obtener clientes:", error.message);
    }



    //Obtener la fecha de la venta(hoy)
    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()); // Ajusta la hora local a UTC
    let fechaHoy = fecha.toISOString().split('T')[0]; //para guardar la fecha


    const formRfcEmpleado=document.getElementById("rfc-empleados").value;

    //obtener el precioUnitario
    let formPrecioUnitarioAutoparte=0;

    //obtener el id de la autoparte
//TODO autopartesDisponibles
    let formIdAutoparte=0;
    const nombreAutoparteSeleccionada=document.getElementById("autoparte-vender-1").value;//TODO, cambiar id
   /* const apiAutopartes = "http://localhost:8080/autopartes";
    const respuestaAutopartes = await fetch(apiAutopartes);
    if (!respuestaAutopartes.ok) {
        throw new Error(`HTTP error! Status: ${respuestaAutopartes.status}`);
    }
    const dataAutopartes = await respuestaAutopartes.json();
    dataAutopartes.forEach(autoparte => {
        if (autoparte.nombre === nombreAutoparteSeleccionada) {
            formIdAutoparte = autoparte.idAutoparte;
            formPrecioUnitarioAutoparte = autoparte.precioUnitario;
        }
    }); */
    autopartesDisponibles.forEach(autoparte =>{
        if (autoparte.nombre === nombreAutoparteSeleccionada) {
            formIdAutoparte = autoparte.idAutoparte;
            formPrecioUnitarioAutoparte = autoparte.precioUnitario;
        }
    });


    //obtener la cantidad
    const formCantidadAutoparte=document.getElementById("cantidad-autoparte-vender-1").value;

    const formSubtotal=document.getElementById("subtotal-1").innerHTML;//TODO ver si es inher o value

    const formTotal=document.getElementById("total").innerHTML;

    //TODO: probando
    formIdCliente = formIdCliente+1;//para que sea el cliente actual
    console.log("id cliente: "+ formIdCliente);
    console.log("rfc empleado: "+formRfcEmpleado);
    console.log("id autoparte" +formIdAutoparte);
    console.log("cantidad: "+formCantidadAutoparte);
    console.log("precio unitario: "+formPrecioUnitarioAutoparte);
    console.log("subtotal: "+formSubtotal);
    console.log("total :"+formTotal);


    //crear el objeto
    const apiUrlVentas="http://localhost:8080/ventas";

    //TODO, ya se guarda, probar con variables, completar el try catch si es necesario, ver que hacer cuando se agregan muchas autopartes
    //PRUEBA DATOS ESTÄTCIOS
    /*const objetoVenta={
        fechaVenta: "1975-11-19",
        cliente: {
            idCliente: 1
         },
         empleado: {
         rfcEmpleado: "empleado1"
        },
        detallesVenta: [
        {
            autoparte: {
                idAutoparte: 1
            },
            cantidad: 2,
            precioUnitario: 350.00,
            subtotal: 700.00
        },
        {
            autoparte: {
                idAutoparte: 3
            },
            cantidad: 1,
            precioUnitario: 252.00,
            subtotal: 252.00
        }
    ],
        total: 952.00
    };

    console.log(JSON.stringify(objetoVenta)); // Verifica que el objeto esté bien formateado*/


    const objetoVenta={
        fechaVenta:fechaHoy,
        cliente:{
          idCliente:formIdCliente
        },
        empleado:{
          rfcEmpleado:formRfcEmpleado
        },
        detallesVenta: [
            {
                autoparte:{
                    idAutoparte:formIdAutoparte
                },
                cantidad:formCantidadAutoparte,
                precioUnitario: formPrecioUnitarioAutoparte,
                subtotal:formSubtotal
            },
            {
                autoparte: {//prueba
                    idAutoparte: 3
                },
                cantidad: 1,
                precioUnitario: 252.00,
                subtotal: 252.00
            }
        ],
        total:formTotal+252
    };

    //Hacer el POST request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoVenta)
    };

    //Hacer el POST request
    fetch(apiUrlVentas, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(ventaFromAPI => {
            console.log('Success:', ventaFromAPI);
            alert("Venta realizada exitosamente");
            limpiarPantalla();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema al realizar la venta. Por favor, intenta nuevamente.");
        });



    //eliminar información de la autoparte que se vendió
}

