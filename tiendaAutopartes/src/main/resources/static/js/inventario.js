// URL desde la que se obtendrán los datos JSON
const url = "/autopartes"; //COMPLETAR URL

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
            //AQUÍ
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function populateTableFromJSON(url) {

    try {
        //AQUI
        allPatientsFromDB.forEach(patient => {

            let idNumber = patient.id;
            row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${patient.phoneNumber}</td>
                    <td contenteditable="false">${patient.name}</td>
                    <td contenteditable="false">${patient.illness}</td>
                    <td contenteditable="false">${patient.height}</td>
                    <td contenteditable="false">${patient.age}</td>
                    <td><button type="button" class="btn btn-danger" id="${idNumber}" onclick="deletePatientButton(id)">Eliminar</button>
                    <button type="button" class="btn btn-warning" id="${idNumber}" onclick="editPatient(id)">Editar</button></td>
                `;
            row.setAttribute("id", idNumber);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the function to populate table
populateTableFromJSON(url);