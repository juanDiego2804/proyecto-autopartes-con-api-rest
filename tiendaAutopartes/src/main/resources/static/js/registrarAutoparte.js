//hacer función para jalar todos los rfc registrados
function cargarOpcionesRFC() {
    const apiUrl = "http://localhost:8080/proveedores";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const select = document.getElementById("rfc-provedores-registrados");
            select.innerHTML = ""; //Limpiar opciones existentes

            //Agregar una opción inicial
            const defaultOption = document.createElement("option");
            defaultOption.textContent = "Elige...";
            defaultOption.selected = true;
            defaultOption.disabled = true;
            select.appendChild(defaultOption);

            //Llenar opciones con los datos ya registrados
            data.forEach(proveedor => {
                const option = document.createElement("option");
                option.value = proveedor.rfcProveedor; //nombre del atributo en el ProveedorModel.java
                option.textContent = proveedor.rfcProveedor;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error al cargar los RFC de los proveedores:", error);
        });
}

//llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", cargarOpcionesRFC);


//hacer lo mismo que en registrarProveedor
function limpiarPantalla(){
    document.getElementById("rfc-provedores-registrados").selectedIndex = 0; //(opción "Elige...")
    document.getElementById("nombre-autoparte").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio-unitario").value = "";
    document.getElementById("marca-autoparte").value = "";
    document.getElementById("modelo-autoparte").value = "";
    document.getElementById("anio-autoparte").value = "";
    document.getElementById("categoria-autoparte").value = "";
    document.getElementById("descripcion-autoparte").value = "";
}

function registrarAutoparte(){
    const formRfcProveedorSeleccionado = document.getElementById("rfc-provedores-registrados").value;
    const formNombreAutoparte = document.getElementById("nombre-autoparte").value;
    const formCantidad = document.getElementById("cantidad").value;
    const formPrecioUnitario = document.getElementById("precio-unitario").value;
    const formMarcaAutoparte = document.getElementById("marca-autoparte").value;
    const formModeloAutoparte = document.getElementById("modelo-autoparte").value;
    const formAnioAutoparte = document.getElementById("anio-autoparte").value;
    const formCategoriaAutoprte = document.getElementById("categoria-autoparte").value;
    const formDescripcionAutoparte = document.getElementById("descripcion-autoparte").value;

    //Validación
    if (!formRfcProveedorSeleccionado || !formNombreAutoparte || !formCantidad || !formPrecioUnitario
        || !formMarcaAutoparte || !formModeloAutoparte ||  !formAnioAutoparte || !formCategoriaAutoprte ||
        !formDescripcionAutoparte) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    if (formCantidad <= 0 || formPrecioUnitario <= 0) {
        alert("Cantidad y precio deben ser mayores que cero.");
        return;
    }
    const anioActual = new Date().getFullYear();
    if (formAnioAutoparte < 1900 || formAnioAutoparte > anioActual) {
        alert(`El año debe estar entre 1900 y ${anioActual}.`);
        return;
    }

    const apiUrl= "http://localhost:8080/autopartes";

    //crear el objeto
    const objetoAutoparte={
        rfc_proveedor : formRfcProveedorSeleccionado,//proveedor, el nombre es el nombre del atributo en AutoparteModel.java
        nombre : formNombreAutoparte,
        cantidadEnExistencia : formCantidad,
        //cantidad : formCantidad, //CORREGIR EN EL BACKEND, AGREGAR ATRIBUTO "cantidad" y hacer lo necesario para que se sume con "cantidadExistencia"
        precioUnitario : formPrecioUnitario,
        marca : formMarcaAutoparte,
        modelo : formModeloAutoparte,
        anio : formAnioAutoparte,
        categoria : formCategoriaAutoprte,
        descripcion : formDescripcionAutoparte
    }

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
        });

}

