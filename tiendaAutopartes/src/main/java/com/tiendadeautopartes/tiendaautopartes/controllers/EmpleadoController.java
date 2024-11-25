package com.tiendadeautopartes.tiendaautopartes.controllers;

import com.tiendadeautopartes.tiendaautopartes.models.EmpleadoModel;
import com.tiendadeautopartes.tiendaautopartes.services.EmpleadoService;
import com.tiendadeautopartes.tiendaautopartes.services.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    @Autowired
    EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping()
    public ResponseEntity<List<EmpleadoModel>> getAllEmpleados() {
        List<EmpleadoModel> empleados = empleadoService.getAllEmpleados();
        return ResponseEntity.ok(empleados);
    }

    @GetMapping("/findEmpleadoByRfc/{rfc}")
    public ResponseEntity<EmpleadoModel> findEmpleadoByRfc(@PathVariable String rfc) {
        Optional<EmpleadoModel> empleado = empleadoService.findEmpleadoByRfc(rfc);
        return empleado.map(ResponseEntity::ok) // Devuelve 200 OK si se encuentra el empleado
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve 404 Not Found si no existe
    }




    @GetMapping("/findEmpleadoByPuesto/{puesto}")
    public ResponseEntity<List<EmpleadoModel>> findEmpleadoByPuesto(@PathVariable String puesto) {
        List<EmpleadoModel> empleados = empleadoService.findEmpleadoByPuesto(puesto);
        return ResponseEntity.ok(empleados); // Devuelve 200 OK con la lista de empleados
    }

    // Buscar empleados por nombre
    @GetMapping("/findEmpleadoByNombre/{nombre}")
    public ResponseEntity<List<EmpleadoModel>> findEmpleadoByNombre(@PathVariable String nombre) {
        List<EmpleadoModel> empleados = empleadoService.findEmpleadoByNombre(nombre);
        return ResponseEntity.ok(empleados); // Devuelve 200 OK con la lista de empleados
    }

    // Buscar empleados por apellidos
    @GetMapping("/findEmpleadoByApellidos/{apellidos}")
    public ResponseEntity<List<EmpleadoModel>> findEmpleadoByApellidos(@PathVariable String apellidos) {
        List<EmpleadoModel> empleados = empleadoService.findEmpleadoByApellidos(apellidos);
        return ResponseEntity.ok(empleados); // Devuelve 200 OK con la lista de empleados
    }

    // Buscar empleado por correo electrónico
    @GetMapping("/findEmpleadoByCorreo/{correoElectronico}")
    public ResponseEntity<EmpleadoModel> findEmpleadoByCorreoElectronico(@PathVariable String correoElectronico) {
        Optional<EmpleadoModel> empleado = empleadoService.findEmpleadoByCorreoElectronico(correoElectronico);
        return empleado.map(ResponseEntity::ok) // Devuelve 200 OK si se encuentra el empleado
                .orElseGet(() -> ResponseEntity.notFound().build()); // Devuelve 404 Not Found si no existe
    }

    @PostMapping
    public ResponseEntity<EmpleadoModel> saveEmpleado(@RequestBody EmpleadoModel empleado) {
        EmpleadoModel savedEmpleado = empleadoService.saveEmpleado(empleado);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmpleado); // Devuelve 201 Created con el empleado guardado
    }

    @PutMapping("/editEmpleado/{rfc}")
    public ResponseEntity<EmpleadoModel> editEmpleado(@PathVariable String rfc, @RequestBody EmpleadoModel empleado) {
        empleado.setRfcEmpleado(rfc); // Asegura que el RFC no cambie
        EmpleadoModel updatedEmpleado = empleadoService.editEmpleado(empleado);
        return ResponseEntity.ok(updatedEmpleado); // Devuelve 200 OK con el empleado actualizado
    }
    @DeleteMapping("/delete-empleado-by-rfc/{rfc}")
    public ResponseEntity<String> deleteEmpleado(@PathVariable("rfc") String rfc) {
        empleadoService.deleteEmpleado(rfc); // Llama al servicio para eliminar
        return ResponseEntity.ok("Empleado eliminado exitosamente."); // Devuelve 200 OK con un mensaje
    }



}
