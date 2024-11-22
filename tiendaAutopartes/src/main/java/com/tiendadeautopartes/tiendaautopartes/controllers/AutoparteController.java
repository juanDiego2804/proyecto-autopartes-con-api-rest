package com.tiendadeautopartes.tiendaautopartes.controllers;

import com.tiendadeautopartes.tiendaautopartes.models.AutoparteModel;
import com.tiendadeautopartes.tiendaautopartes.services.AutoparteService;
import com.tiendadeautopartes.tiendaautopartes.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/autopartes")
public class AutoparteController {
    @Autowired
    AutoparteService autoparteService;

    public AutoparteController(AutoparteService autoparteService) {
        this.autoparteService = autoparteService;
    }

    @GetMapping()
    public List<AutoparteModel> getAllAutopartes(){
        return autoparteService.getAllAutopartes();
    }



    // Endpoint para obtener una autoparte por ID
    @GetMapping("/findAutoparteById/{id}")
    public ResponseEntity<AutoparteModel> findAutoparteById(@PathVariable Long id){
        Optional<AutoparteModel> autoparte = autoparteService.findAutoparteById(id);
        return autoparte.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para buscar autopartes por nombre
    @GetMapping("/findAutoparteByNombre/{nombre}")
    public List<AutoparteModel> findAutoparteByNombre(@PathVariable String nombre){
        return autoparteService.findAutopartesByNombre(nombre);
    }

    // Endpoint para buscar autopartes por marca
    @GetMapping("/findAutoparteByMarca/{marca}")
    public List<AutoparteModel> findAutoparteByMarca(@PathVariable String marca){
        return autoparteService.findAutopartesByMarca(marca);
    }

    // Endpoint para buscar autopartes por categoría
    @GetMapping("/findAutoparteByCategoria/{categoria}")
    public List<AutoparteModel> findAutoparteByCategoria(@PathVariable String categoria){
        return autoparteService.findAutopartesByCategoria(categoria);
    }

    // Endpoint para guardar una nueva autoparte
    @PostMapping()
    public ResponseEntity<AutoparteModel> saveAutoparte(@RequestBody AutoparteModel autoparte){
        AutoparteModel savedAutoparte = autoparteService.saveAutoparte(autoparte);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAutoparte);
    }


    // Endpoint para eliminar una autoparte por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAutoparte(@PathVariable("id") Long id){
        String response = autoparteService.deleteAutoparteById(id);
        return ResponseEntity.ok(response);
    }


    // Endpoint para editar una autoparte (actualizar)
    @PutMapping("/editAutoparte/{id}")
    public ResponseEntity<AutoparteModel> editAutoparte(@PathVariable Long id, @RequestBody AutoparteModel autoparte){
        autoparte.setIdAutoparte(id); // Aseguramos que el ID se mantenga
        AutoparteModel updatedAutoparte = autoparteService.editAutoparte(autoparte);
        return ResponseEntity.ok(updatedAutoparte);
    }
}
