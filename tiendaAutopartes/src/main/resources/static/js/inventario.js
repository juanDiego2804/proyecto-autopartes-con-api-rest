// URL desde la que se obtendrán los datos JSON
const url = "http://localhost:8080/autopartes";



//Llenar tabla con los datos registrados
async function llenarTabla(url){
    limpiarFilasTabla();

    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error("Respuesta de red no fue ok");
        }
        const autopartesDesdeBD = await respuesta.json();
        const tableBody = document.querySelector("#tabla-autopartes tbody");
        autopartesDesdeBD.forEach(autoparte => {
            const row = document.createElement("tr");

            let idNumber = autoparte.idAutoparte;//AQUI,checar si proveedor es correcto
            row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${autoparte.nombre}</td>
                    <td contenteditable="false">${autoparte.cantidadEnExistencia}</td>
                    <td contenteditable="false">${autoparte.precioUnitario}</td>
                    <td contenteditable="false">${autoparte.proveedor.rfcProveedor}</td> 
                    <td contenteditable="false">${autoparte.marca}</td> 
                    <td contenteditable="false">${autoparte.modelo}</td> 
                    <td contenteditable="false">${autoparte.anio}</td> 
                    <td contenteditable="false">${autoparte.categoria}</td> 
                    <td contenteditable="false">${autoparte.descripcion}</td> 
                    
                    <td><button type="button" class="btn btn-info btn-sm" id="editar-${idNumber}" onclick="editarAutoparte(id)">Editar</button><!--Agregar boton guardar-->
                    <button type="button" class="btn btn-danger btn-sm" id="eliminar-${idNumber}" onclick="botonEliminarAutoparte(id)">Eliminar</button><!--Confirmar para eliminar--></td> 
                `;//agregar oncklick en los dos botones
            row.setAttribute("id", idNumber);
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('No se pudieron cargar las autopartes. Intenta nuevamente más tarde.');
    }
}

//llamada de la función para llenar la tabla
document.addEventListener("DOMContentLoaded", () => llenarTabla(url));


//funcion para editar
function editarAutoparte(idboton){//buttonPressId
    //id de la fila
    let row = document.getElementById(idboton);

    //campos a editar
    let id = row.children.item(0);
    let nombre = row.children.item(1);
    let cantidadExistencia = row.children.item(2);
    let precioUnitario = row.children.item(3);
    let rfcProveedor = row.children.item(4);
    let marca = row.children.item(5);
    let modelo = row.children.item(6);
    let anio = row.children.item(7);
    let categoria = row.children.item(8);
    let descripcion = row.children.item(9);

    //cambiar la propiedad content editable, excepto id y rfcProveedor
    nombre.setAttribute("contenteditable","true");
    cantidadExistencia.setAttribute("contenteditable","true");
    precioUnitario.setAttribute("contenteditable","true");
    marca.setAttribute("contenteditable","true");
    modelo.setAttribute("contenteditable","true");
    anio.setAttribute("contenteditable","true");
    categoria.setAttribute("contenteditable","true");
    descripcion.setAttribute("contenteditable","true");

    //poner el cursor sobre la celda 1
    row.children.item(1).focus();

    //cambiar el texto y color del boton de editar por guardar
    let botonEditar = row.children.item(10).children.item(0);
    botonEditar.setAttribute("class","btn btn-success");
    botonEditar.innerHTML = "Guardar";

    //al presionar el botón de guardar mandar llamar al metodo guardarAutoparte(con los datos de la fila)
    botonEditar.setAttribute("onClick","guardarAutoparte("+idboton+")");
}

function guardarAutoparte(idBoton){
    let row = document.getElementById(idButtonPress);

    let id = row.children.item(0);
    let nombre = row.children.item(1);
    let cantidadExistencia = row.children.item(2);
    let precioUnitario = row.children.item(3);
    let rfcProveedor = row.children.item(4);
    let marca = row.children.item(5);
    let modelo = row.children.item(6);
    let anio = row.children.item(7);
    let categoria = row.children.item(8);
    let descripcion = row.children.item(9);

    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()); // Ajusta la hora local a UTC
    let fechaHoy = fecha.toISOString().split('T')[0]; //para guardar la fecha

    //objeto que se edito
    const autoparteActualizada={
        idAutoparte  : id.innerHTML,
        nombre : nombre.html,
        cantidadEnExistencia : cantidadExistencia.innerHTML,
        precioUnitario : precioUnitario.innerHTML,
        descripcion : descripcion.innerHTML,
        fechaDeRegistro : fechaHoy,
        proveedor : {
            rfcProveedor: rfcProveedor.innerHTML
        },
        marca : marca.innerHTML,
        modelo : modelo.innerHTML,
        anio : anio.innerHTML,
        categoria : categoria.innerHTML
    };

    const apiUrl= "http://localhost:8080/autopartes";

    // Configure the request
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(PatientUpdated)
    };

    //POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(autoparteFromAPI => {
            console.log('Success:', autoparteFromAPI);
            llenarTabla(url);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function  encontrarAutoparte(id, findPath){//TODO poner en los botones
    limpiarFilasTabla();
    llenarTabla(url+findPath+document.getElementById(id).value);
}

function limpiarFilasTabla() {
    var numeroFilasDeEncabezadoDeTabla = 1;
    var tabla = document.getElementById('tabla-autopartes');
    var cuentaFilas = tabla.rows.length;
    for (var i = numeroFilasDeEncabezadoDeTabla; i < cuentaFilas; i++) {
        tabla.deleteRow(numeroFilasDeEncabezadoDeTabla);
    }
}

function botonEliminarAutoparte(id) {
    if (confirm("Estas seguro de eliminar la autoparte: "+id)) {
        eliminarAutoparte(id);
    } else {
        console.log("No se ha eliminado al paciente");
    }
}

function eliminarAutoparte(id){
    const urlEliminar= "http://localhost:8080/autopartes/delete-autoparte-by-id?id="+id;//TODO checar después si funciona
    //const deleteUrl = "http://PACIENTES-env.eba-iwpn59ex.us-east-2.elasticbeanstalk.com/patients/delete-patient-by-id?id="+id;
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

