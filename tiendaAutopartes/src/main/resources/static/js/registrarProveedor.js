function limpiarPantalla(){
    document.getElementById("nombre-proveedor").value = "";
    document.getElementById("rfc-proveedor").value = "";
    document.getElementById("correo-proveedor").value = "";
    document.getElementById("telefono-proveedor").value = "";
    document.getElementById("direccion-proveedor").value = "";
}

function registrarProveedor(){
    const formNombreProveedor = document.getElementById("nombre-proveedor").value;
    const formRfcProveedor = document.getElementById("rfc-proveedor").value;
    const formCorreoProveedor = document.getElementById("correo-proveedor").value;
    const formTelefonoProveedor = document.getElementById("telefono-proveedor").value;
    const formDireccionProveedor = document.getElementById("direccion-proveedor").value;

    //Validación
    if (!formNombreProveedor || !formRfcProveedor || !formCorreoProveedor || !formTelefonoProveedor
        || !formDireccionProveedor) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }
    //Si es necesario, validar RFC, telefono


    const apiUrl = "/proveedores";//"http://localhost:8080/proveedores";
    //const apiUrl = "http://PACIENTES-env.eba-iwpn59ex.us-east-2.elasticbeanstalk.com/patients";

    //crear el objeto
    const objetoProveedor={
        nombre : formNombreProveedor,
        rfcProveedor : formRfcProveedor,
        correoElectronico : formCorreoProveedor,
        telefono : formTelefonoProveedor,
        direccion : formDireccionProveedor
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoProveedor)
    };

    //Hacer el POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(proveedorFromAPI => {
            console.log('Success:', proveedorFromAPI);
            alert("Proveedor registrado exitosamente");
            limpiarPantalla();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema al registrar el proveedor. Por favor, intenta nuevamente.");
        });
}
