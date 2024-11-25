package com.tiendadeautopartes.tiendaautopartes.controllers;

import com.tiendadeautopartes.tiendaautopartes.models.VentaModel;
import com.tiendadeautopartes.tiendaautopartes.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/ventas")
public class VentaController {
    @Autowired
    VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping()
    public ResponseEntity<VentaModel> saveVenta(@RequestBody VentaModel venta) {
        VentaModel savedVenta = ventaService.saveVenta(venta);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVenta); // 201 Created
    }


    @GetMapping("/findVenteById/{idVenta}")
    public ResponseEntity<VentaModel> findVentaById(@PathVariable Long idVenta) {
        Optional<VentaModel> venta = ventaService.findVentaById(idVenta);
        return venta.map(ResponseEntity::ok) // 200 OK si se encuentra
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found si no existe
    }
    @DeleteMapping("/{idVenta}")
    public ResponseEntity<String> deleteVentaById(@PathVariable("idVenta") Long idVenta) {
        try {
            String result = ventaService.deleteVentaById(idVenta);
            return ResponseEntity.ok(result); // 200 OK si se elimina correctamente
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); // 404 Not Found si no se encuentra
        }
    }


    @PutMapping("/updateVenta/{idVenta}")
    public ResponseEntity<VentaModel> updateVenta(@PathVariable Long idVenta, @RequestBody VentaModel nuevaVenta) {
        try {
            VentaModel updatedVenta = ventaService.updateVenta(idVenta, nuevaVenta);
            return ResponseEntity.ok(updatedVenta); // 200 OK si se actualiza correctamente
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found si no se encuentra
        }
    }

}
