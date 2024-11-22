package com.tiendadeautopartes.tiendaautopartes.controllers;

import com.tiendadeautopartes.tiendaautopartes.models.ClienteModel;
import com.tiendadeautopartes.tiendaautopartes.services.ClienteService;
import com.tiendadeautopartes.tiendaautopartes.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteModel>> getAllClientes() {
        List<ClienteModel> clientes = clienteService.getAllClientes();
        return ResponseEntity.ok(clientes); // Devuelve 200 OK con la lista de clientes
    }



    @PostMapping
    public ResponseEntity<ClienteModel> saveCliente(@RequestBody ClienteModel cliente) {
        ClienteModel savedCliente = clienteService.saveCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente); // Devuelve 201 Created con el cliente guardado
    }
    // Buscar cliente por teléfono
    @GetMapping("/findClienteByTelefono/{telefono}")
    public ResponseEntity<ClienteModel> findClienteByTelefono(@PathVariable String telefono) {
        Optional<ClienteModel> cliente = clienteService.findClienteByTelefono(telefono);
        return cliente.map(ResponseEntity::ok) // Devuelve 200 OK si se encuentra el cliente
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve 404 Not Found si no se encuentra
    }

}
