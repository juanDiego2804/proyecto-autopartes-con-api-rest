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

            let idNumber = autoparte.idAutoparte;
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
                    
                    <td><button type="button" class="btn btn-info btn-sm" id="${idNumber}" onclick="editarAutoparte(id)">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" id="${idNumber}" onclick="botonEliminarAutoparte(id)">Eliminar</button></td> 
                `;
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

function editarAutoparte(idboton){
    //id de la fila
    let row = document.getElementById(idboton);

    //campos a editar
    //id no se edita
    let nombre = row.children.item(1);
    let cantidadExistencia = row.children.item(2);
    let precioUnitario = row.children.item(3);
    //rfcProveedor no se edita
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
    nombre.focus();
    nombre.style.caretColor="black";//para ver el cursor
    cantidadExistencia.style.caretColor="black";
    precioUnitario.style.caretColor="black";
    marca.style.caretColor="black";
    modelo.style.caretColor="black";
    anio.style.caretColor="black";
    categoria.style.caretColor="black";
    descripcion.style.caretColor="black";

    //cambiar el texto y color del boton de editar por guardar
    let botonEditar = row.children.item(10).children.item(0);
    botonEditar.setAttribute("class","btn btn-success");
    botonEditar.innerHTML = "Guardar";

    //al presionar el botón de guardar mandar llamar al metodo guardarAutoparte(con los datos de la fila)
    botonEditar.setAttribute("onClick", `guardarAutoparte('${idboton}')`);
}

function guardarAutoparte(idBoton){
    let row = document.getElementById(idBoton);

    let varId = row.children.item(0);
    let varNombre = row.children.item(1);
    let varCantidadExistencia = row.children.item(2);
    let varPrecioUnitario = row.children.item(3);
    let varRfcProveedor = row.children.item(4);
    let varMarca = row.children.item(5);
    let varModelo = row.children.item(6);
    let varAnio = row.children.item(7);
    let varCategoria = row.children.item(8);
    let varDescripcion = row.children.item(9);

    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset()); // Ajusta la hora local a UTC
    let fechaHoy = fecha.toISOString().split('T')[0]; //para guardar la fecha

    //Validaciones
    if (!varNombre.innerHTML.trim()) {
        alert("El nombre no puede estar vacío.");
        return;
    }
    if (isNaN(varCantidadExistencia.innerHTML) || varCantidadExistencia.innerHTML <= 0) {
        alert("La cantidad debe ser un número mayor a 0.");
        return;
    }
    if (isNaN(varPrecioUnitario.innerHTML) || varPrecioUnitario.innerHTML <= 0) {
        alert("El precio unitario debe ser un número mayor a 0.");
        return;
    }
    if (!varMarca.innerHTML.trim()) {
        alert("La marca no puede estar vacía.");
        return;
    }
    if (!varModelo.innerHTML.trim()) {
        alert("El modelo no puede estar vacío.");
        return;
    }
    if (isNaN(varAnio.innerHTML) || varAnio.innerHTML < 1900 || varAnio.innerHTML > new Date().getFullYear()) {
        alert("El año debe ser un número válido entre 1900 y el año actual.");
        return;
    }
    if (!varCategoria.innerHTML.trim()) {
        alert("La categoría no puede estar vacía.");
        return;
    }
    if (!varDescripcion.innerHTML.trim()) {
        alert("La descripción no puede estar vacía.");
        return;
    }

    //objeto que se edito
    const autoparteActualizada={
        nombre : varNombre.innerHTML,
        cantidadEnExistencia : varCantidadExistencia.innerHTML,
        precioUnitario : varPrecioUnitario.innerHTML,
        descripcion : varDescripcion.innerHTML,
        fechaDeRegistro : fechaHoy,
        proveedor : {
            rfcProveedor: varRfcProveedor.innerHTML
        },
        marca : varMarca.innerHTML,
        modelo : varModelo.innerHTML,
        anio : varAnio.innerHTML,
        categoria : varCategoria.innerHTML
    };

    const apiUrl = `http://localhost:8080/autopartes/editAutoparte/${varId.innerHTML}`;

    // Configure the request
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoparteActualizada)
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
            llenarTabla(url)
            alert("Autoparte editada correctamente");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function  encontrarAutoparte(id, findPath){
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
    if (confirm("Estas seguro de eliminar la autoparte con el id: "+id)) {
        eliminarAutoparte(id);
        alert("Autoparte eliminada correctamente");
    } else {
        alert("No se ha eliminado la autoparte");
    }
}

function eliminarAutoparte(id){
    const urlEliminar= "http://localhost:8080/autopartes/delete-autoparte-by-id/"+id;
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

