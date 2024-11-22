let contadorAutopartes = 1; //Para evitar ids duplicados

let agregarOtraAutoparte = () => {
    console.log("Se llamó a agregarOtraAutoparte");//quitar después

    let contenido = `
        <div class="row" id="fila-autoparte-${contadorAutopartes}">
            <div class="col-4">
                <label for="autoparte-vender-${contadorAutopartes}" class="form-label">Selecciona la autoparte:</label>
                <select id="autoparte-vender-${contadorAutopartes}" name="autoparte-vender-${contadorAutopartes}" class="form-select">
                    <option selected>Elige...</option>
                    <option value="llanta">Llanta para carro</option>
                    <option value="aceite">Aceite motor V8</option>
                </select>
            </div>

            <div class="col-2">
                <label for="cantidad-autoparte-vender-${contadorAutopartes}" class="form-label">Selecciona la cantidad:</label>
                <select id="cantidad-autoparte-vender-${contadorAutopartes}" name="cantidad-autoparte-vender-${contadorAutopartes}" class="form-select">
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
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