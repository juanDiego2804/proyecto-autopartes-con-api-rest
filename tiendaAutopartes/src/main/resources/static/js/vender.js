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
    cargarRfcEmpleados();//TODO no funciona
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
function realizarVenta(){
    registrarCliente();

    //guardar la información en las tablas de ventas
    /*const formAutoparte
    const formCantidad
    const formSubtotal
    const formTotal
    const formMetodoPago
    const formRfcEmpleado

    //AQUI para ABAJP
        const formRfcProveedorSeleccionado = document.getElementById("rfc-provedores-registrados").value;
        const formNombreAutoparte = document.getElementById("nombre-autoparte").value;
        const formCantidad = document.getElementById("cantidad").value;
        const formPrecioUnitario = document.getElementById("precio-unitario").value;
        const formMarcaAutoparte = document.getElementById("marca-autoparte").value;
        const formModeloAutoparte = document.getElementById("modelo-autoparte").value;
        const formAnioAutoparte = document.getElementById("anio-autoparte").value;
        const formCategoriaAutoprte = document.getElementById("categoria-autoparte").value;
        const formDescripcionAutoparte = document.getElementById("descripcion-autoparte").value;



        const apiUrl= "http://localhost:8080/autopartes";


        //crear el objeto
        const objetoAutoparte={
            nombre : formNombreAutoparte,
            cantidadEnExistencia : formCantidad,
            //cantidad : formCantidad, //CORREGIR EN EL BACKEND, AGREGAR ATRIBUTO "cantidad" y hacer lo necesario para que se sume con "cantidadExistencia"
            precioUnitario : formPrecioUnitario,

            descripcion : formDescripcionAutoparte,
            fechaDeRegistro : fechaHoy,
            proveedor : {
                rfcProveedor: formRfcProveedorSeleccionado
            },//proveedor, el nombre es el nombre del atributo en AutoparteModel.java
            marca : formMarcaAutoparte,
            modelo : formModeloAutoparte,
            anio : formAnioAutoparte,
            categoria : formCategoriaAutoprte
        };


        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetoAutoparte)
        };

        //Hacer el POST request
        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(autoparteFromAPI => {
                console.log('Success:', autoparteFromAPI);
                alert("Autoparte registrada exitosamente");
                limpiarPantalla();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Hubo un problema al registrar la autoparte. Por favor, intenta nuevamente.");
            });*/


    //eliminar información de la autoparte que se vendió
}

