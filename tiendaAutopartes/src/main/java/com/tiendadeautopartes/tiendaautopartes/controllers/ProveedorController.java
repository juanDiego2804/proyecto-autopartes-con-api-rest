package com.tiendadeautopartes.tiendaautopartes.controllers;

import com.tiendadeautopartes.tiendaautopartes.models.ProveedorModel;
import com.tiendadeautopartes.tiendaautopartes.services.ProveedorService;
import com.tiendadeautopartes.tiendaautopartes.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    @Autowired
    ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    // Obtener todos los proveedores
    @GetMapping
    public ResponseEntity<List<ProveedorModel>> getAllProveedores() {
        List<ProveedorModel> proveedores = proveedorService.getAllProveedores();
        return ResponseEntity.ok(proveedores); // Devuelve 200 OK con la lista de proveedores
    }

    @PostMapping
    public ResponseEntity<ProveedorModel> saveProveedor(@RequestBody ProveedorModel proveedor) {
        ProveedorModel savedProveedor = proveedorService.saveProveedor(proveedor);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProveedor); // Devuelve 201 Created con el proveedor guardado
    }

    // Buscar proveedor por RFC
    @GetMapping("/findProveedorByRfc/{rfc}")
    public ResponseEntity<ProveedorModel> findProveedorByRfc(@PathVariable String rfc) {
        Optional<ProveedorModel> proveedor = proveedorService.findProveedorByRfc(rfc);
        return proveedor.map(ResponseEntity::ok) // Devuelve 200 OK si se encuentra el proveedor
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve 404 Not Found si no existe
    }

}
