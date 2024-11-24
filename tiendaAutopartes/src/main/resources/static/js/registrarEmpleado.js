function limpiarPantalla(){
    document.getElementById("nombre-empleado").value="";
    document.getElementById("apellidos-empleado").value="";
    document.getElementById("fecha-nacimiento").value="";
    document.getElementById("NSS").value="";
    document.getElementById("rfc-empleado").value="";
    document.getElementById("correo-empleado").value="";
    document.getElementById("telefono-empleado").value="";
    document.getElementById("puesto-empleado").selectedIndex = 0; //(opción "Elige...")
    document.getElementById("fecha-contratacion").value="";
}
function registrarEmpleado(){
    const formNombreEmpleado=document.getElementById("nombre-empleado").value;
    const formApellidosEmpleado=document.getElementById("apellidos-empleado").value;
    const formFechaNacimiento=document.getElementById("fecha-nacimiento").value;
    const formNSS=document.getElementById("NSS").value;
    const formRfcEmpleado=document.getElementById("rfc-empleado").value;
    const formCorreoEmpleado=document.getElementById("correo-empleado").value;
    const formTelefonoEmpleado=document.getElementById("telefono-empleado").value;
    const formPuestoEmpleado=document.getElementById("puesto-empleado").value;
    const formFechaContratacion=document.getElementById("fecha-contratacion").value;

    const apiUrl= "http://localhost:8080/empleados";//TODO: no funciona el endpoint

    //TODO: verificar si es necesario anidar objetos
    const objetoEmpleado={
        nombre:formNombreEmpleado,
        apellidos: formApellidosEmpleado,
        puesto: formPuestoEmpleado,
        rfcEmpleado:formRfcEmpleado,
        datosEmpleado:{
            nss: formNSS,
            rfcEmpleado: formRfcEmpleado,
            telefono: formTelefonoEmpleado,
            correoElectronico: formCorreoEmpleado,
            fechaContratacion: formFechaContratacion,
            fechaNacimiento:formFechaNacimiento
        }
    };

    console.log(objetoEmpleado);//prueba


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoEmpleado)
    };

    //Hacer el POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(empleadoFromAPI => {
            console.log('Success:', empleadoFromAPI);
            alert("Empleado registrado exitosamente");
            limpiarPantalla();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema al registrar el empleado. Por favor, intenta nuevamente.");
        });
}

