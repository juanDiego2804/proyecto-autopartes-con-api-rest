// URL desde la que se obtendrán los datos JSON
const url = "http://localhost:8080/empleados";

//Llenar tabla con los datos registrados
async function llenarTabla(url){
    limpiarFilasTabla();

    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error("Respuesta de red no fue ok");
        }
        const empleadosDesdeBD = await respuesta.json();
        const tableBody = document.querySelector("#tabla-empleados tbody");
        empleadosDesdeBD.forEach(empleado => {
            const row = document.createElement("tr");

            let idNumber = empleado.rfcEmpleado;//id de la tabla, TODO: checar si se cambia ese idNumber
            row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${empleado.nombre}</td>
                    <td contenteditable="false">${empleado.apellidos}</td>
                    <td contenteditable="false">${empleado.puesto}</td>
                    <td contenteditable="false">${empleado.datosEmpleado.fechaContratacion}</td> 
                    <td contenteditable="false">${empleado.datosEmpleado.correoElectronico}</td> 
                    <td contenteditable="false">${empleado.datosEmpleado.telefono}</td> 
                    <td contenteditable="false">${empleado.datosEmpleado.fechaNacimiento}</td> 
                    <td contenteditable="false">${empleado.datosEmpleado.nss}</td> 
                    
                    <td><button type="button" class="btn btn-info btn-sm" id="${idNumber}" onclick="editarEmpleado(id)">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" id="${idNumber}" onclick="botonEliminarEmpleado(id)">Eliminar</button></td> 
                `;
            row.setAttribute("id", idNumber);
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('No se pudieron cargar los empleados. Intenta nuevamente más tarde.');
    }
}

//llamada de la función para llenar la tabla
document.addEventListener("DOMContentLoaded", () => llenarTabla(url));

function editarEmpleado(idboton){
    //id de la fila
    let row = document.getElementById(idboton);

    //campos a editar
    //rfc no se edita TODO: ver si es necesario editar RFC
    let nombre = row.children.item(1);
    let apellidos = row.children.item(2);
    let puesto = row.children.item(3);
    let fechaContratacion = row.children.item(4);
    let correo = row.children.item(5);
    let telefono = row.children.item(6);
    let fechaNacimiento = row.children.item(7);
    let nss = row.children.item(8);

    //cambiar la propiedad content editable, excepto rfc
    nombre.setAttribute("contenteditable","true");
    apellidos.setAttribute("contenteditable","true");
    puesto.setAttribute("contenteditable","true");
    fechaContratacion.setAttribute("contenteditable","true");
    correo.setAttribute("contenteditable","true");
    telefono.setAttribute("contenteditable","true");
    fechaNacimiento.setAttribute("contenteditable","true");
    nss.setAttribute("contenteditable","true");

    //poner el cursor sobre la celda 1
    nombre.focus();
    apellidos.style.caretColor="black";//para ver el cursor
    puesto.style.caretColor="black";
    fechaContratacion.style.caretColor="black";
    correo.style.caretColor="black";
    telefono.style.caretColor="black";
    fechaNacimiento.style.caretColor="black";
    nss.style.caretColor="black";


    //cambiar el texto y color del boton de editar por guardar
    let botonEditar = row.children.item(9).children.item(0);
    botonEditar.setAttribute("class","btn btn-success");
    botonEditar.innerHTML = "Guardar";

    //al presionar el botón de guardar mandar llamar al metodo guardarEmpleado(con los datos de la fila)
    botonEditar.setAttribute("onClick", `guardarEmpleado('${idboton}')`);
}

function guardarEmpleado(idBoton){
    let row = document.getElementById(idBoton);

    let varRFC = row.children.item(0);
    let varNombre = row.children.item(1);
    let varApellidos = row.children.item(2);
    let varPuesto = row.children.item(3);
    let varFechaContratacion = row.children.item(4);
    let varCorreo = row.children.item(5);
    let varTelefono = row.children.item(6);
    let varFechaNacimiento = row.children.item(7);
    let varNSS = row.children.item(8);



    if (!varRFC.innerHTML.trim()) {
        alert("El RFC no puede estar vacío.");
        return;
    }
    if (!varNombre.innerHTML.trim()) {
        alert("El nombre no puede estar vacío.");
        return;
    }
    if (!varApellidos.innerHTML.trim()) {
        alert("Los apellidos no pueden estar vacíos.");
        return;
    }
    if (!varPuesto.innerHTML.trim()) {
        alert("El puesto no puede estar vacío.");
        return;
    }
    if (!varFechaContratacion.innerHTML.trim()) {
        alert("La fecha de contratación no puede estar vacía.");
        return;
    }
    if (!varCorreo.innerHTML.trim()) {
        alert("El correo electrónico no puede estar vacío.");
        return;
    }
    if (!varTelefono.innerHTML.trim()) {
        alert("El teléfono no puede estar vacío.");
        return;
    }
    if (!varFechaNacimiento.innerHTML.trim()) {
        alert("La fecha de nacimiento no puede estar vacía.");
        return;
    }
    if (!varNSS.innerHTML.trim()) {
        alert("El NSS no puede estar vacío.");
        return;
    }

    //TODO: verificar si es necesario anidar objetos
    //objeto que se edito

    const empleadoActualizado={
        nombre:varNombre.innerHTML,
        apellidos: varApellidos.innerHTML,
        puesto: varPuesto.innerHTML,
        rfcEmpleado:varRFC.innerHTML,
        datosEmpleado:{
            nss: varNSS.innerHTML,
            rfcEmpleado: varRFC.innerHTML,
            telefono: varTelefono.innerHTML,
            correoElectronico: varCorreo.innerHTML,
            fechaContratacion: varFechaContratacion.innerHTML,
            fechaNacimiento:varFechaNacimiento.innerHTML
        }
    };


    const apiUrl = `http://localhost:8080/empleados/editEmpleado/${varRFC.innerHTML}`;

    // Configure the request
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleadoActualizado)
    };

    //POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(empleadoFromAPI => {
            console.log('Success:', empleadoFromAPI);
            llenarTabla(url)
            alert("Empleado editado correctamente");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function  encontrarEmpleado(id, findPath){
    limpiarFilasTabla();
    llenarTabla(url+findPath+document.getElementById(id).value);
}

function limpiarFilasTabla() {//mover hacia abajo
    var numeroFilasDeEncabezadoDeTabla = 1;
    var tabla = document.getElementById('tabla-empleados');
    var cuentaFilas = tabla.rows.length;
    for (var i = numeroFilasDeEncabezadoDeTabla; i < cuentaFilas; i++) {
        tabla.deleteRow(numeroFilasDeEncabezadoDeTabla);
    }
}

function botonEliminarEmpleado(id) {
    if (confirm("Estas seguro de eliminar lal empleado con el rfc: "+id)) {
        eliminarAutoparte(id);
        alert("Empleado eliminado correctamente");
    } else {
        alert("No se ha eliminado al empleado");
    }
}

function eliminarEmpleado(rfc){
    const urlEliminar= "http://localhost:8080/autopartes/delete-empleado-by-rfc/"+rfc;
    fetch(urlEliminar, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
            console.log('OK', data);
            llenarTabla(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
