package com.tiendadeautopartes.tiendaautopartes.services;

import com.tiendadeautopartes.tiendaautopartes.models.EmpleadoModel;
import com.tiendadeautopartes.tiendaautopartes.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {
    @Autowired
    EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }
    @Transactional
    public List<EmpleadoModel> getAllEmpleados(){
        return empleadoRepository.getAllEmpleados();
    }

    public Optional<EmpleadoModel> findEmpleadoByRfc(String rfc){
        return empleadoRepository.findByRfcEmpleado(rfc);
    }

    public Optional<EmpleadoModel> findByRfcEmpleadoWithDatos(String rfcEmpleado) {
        return empleadoRepository.findByRfcEmpleadoWithDatos(rfcEmpleado);
    }



    public List<EmpleadoModel> findEmpleadoByPuesto(String puesto){
        return empleadoRepository.findByPuesto(puesto);
    }

    public List<EmpleadoModel> findEmpleadoByNombre(String nombre){
        return empleadoRepository.findByNombre(nombre);
    }

    public List<EmpleadoModel> findEmpleadoByApellidos(String apellidos){
        return empleadoRepository.findByApellidos(apellidos);
    }

    //Ya que DatosEmpleadoModel tiene una relación @OneToOne con EmpleadoModel, puedes buscar directamente por el correo electrónico usando el método que de el repositorio.
    public Optional<EmpleadoModel> findEmpleadoByCorreoElectronico(String correoElectronico) {
        return empleadoRepository.findByCorreoElectronico(correoElectronico);
    }

    public EmpleadoModel saveEmpleado(EmpleadoModel empleado) {
        // Validar si ya existe un empleado con el mismo RFC
        if (empleadoRepository.existsById(empleado.getRfcEmpleado())) {
            throw new IllegalArgumentException("Ya existe un empleado con este RFC: " + empleado.getRfcEmpleado());
        }

        // Guardar el empleado y sus datos asociados
        return empleadoRepository.save(empleado);
    }

    public EmpleadoModel editEmpleado(EmpleadoModel empleado) {
        // Verifica si existe otro empleado con el nuevo RFC
        Optional<EmpleadoModel> duplicado = empleadoRepository.findByRfcEmpleado(empleado.getRfcEmpleado());

        if (duplicado.isPresent() && !duplicado.get().getRfcEmpleado().equals(empleado.getRfcEmpleado())) {
            throw new IllegalArgumentException("Ya existe un empleado con el RFC especificado.");
        }

        return empleadoRepository.save(empleado);
    }
    public String deleteEmpleado(String rfcEmpleado) {
        if (!empleadoRepository.existsById(rfcEmpleado)) {
            throw new IllegalArgumentException("El empleado con RFC " + rfcEmpleado + " no existe.");
        }
        empleadoRepository.deleteById(rfcEmpleado);
        return "Empleado eliminado exitosamente.";
    }

}
