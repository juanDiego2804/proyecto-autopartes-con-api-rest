// URL desde la que se obtendrán los datos JSON
const url = "http://localhost:8080/autopartes";

function limpiarFilasTabla() {//mover al final
    var numeroFilasDeEncabezadoDeTabla = 1;
    var tabla = document.getElementById('tabla-autopartes');
    var cuentaFilas = tabla.rows.length;
    for (var i = numeroFilasDeEncabezadoDeTabla; i < cuentaFilas; i++) {
        tabla.deleteRow(numeroFilasDeEncabezadoDeTabla);
    }
}

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
                    <td contenteditable="false">${autoparte.phoneNumber}</td>
                    <td contenteditable="false">${autoparte.nombre}</td>
                    <td contenteditable="false">${autoparte.cantidadEnExistencia}</td>
                    <td contenteditable="false">${autoparte.precioUnitario}</td>
                    <td contenteditable="false">${autoparte.proveedor}</td> 
                    <td contenteditable="false">${autoparte.marca}</td> 
                    <td contenteditable="false">${autoparte.modelo}</td> 
                    <td contenteditable="false">${autoparte.anio}</td> 
                    <td contenteditable="false">${autoparte.categoria}</td> 
                    <td contenteditable="false">${autoparte.descripcion}</td> 
                    
                    <td><button type="button" class="btn btn-info btn-sm" id="editar-${idNumber}" onclick="editarAutoparte(id)">Editar</button><!--Agregar boton guardar-->
                    <button type="button" class="btn btn-danger btn-sm" id="eliminar-${idNumber}">Eliminar</button><!--Confirmar para eliminar--></td> 
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
//AQUÍ VOY TODO
function editarAutoparte(buttonPressId) {
    //obtener la row que fue llamada
    let row = document.getElementById(buttonPressId);

    let phoneNumberCell = row.children.item(1);
    let nameCell = row.children.item(2);
    let illnessCell = row.children.item(3);
    let heightCell = row.children.item(4);
    let ageCell = row.children.item(5);

    //cambiar la propiedad content editable
    phoneNumberCell.setAttribute("contenteditable", "true");
    nameCell.setAttribute("contenteditable", "true");
    illnessCell.setAttribute("contenteditable", "true");
    heightCell.setAttribute("contenteditable", "true");
    ageCell.setAttribute("contenteditable", "true");

    //poner el cursor sobre la celda 1
    row.children.item(1).focus();

    //cambiar el texto y color del boton de editar por guardar
    let editButton = row.children.item(6).children.item(1);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Guardar";


    //al presionar el botón de guardar mandar llamar al metodo savePatient(con los datos de la fila)
    editButton.setAttribute("onClick","savePatient("+buttonPressId+")");

}

