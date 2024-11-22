package com.tiendadeautopartes.tiendaautopartes.services;

import com.tiendadeautopartes.tiendaautopartes.models.AutoparteModel;
import com.tiendadeautopartes.tiendaautopartes.repositories.AutoparteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AutoparteService {
    @Autowired
    AutoparteRepository autoparteRepository;


    public AutoparteService(AutoparteRepository autoparteRepository) {
        this.autoparteRepository = autoparteRepository;
    }

    public List<AutoparteModel> getAllAutopartes() {
        return autoparteRepository.findAll();
    }

    public Optional<AutoparteModel> findAutoparteById(Long id){
        return autoparteRepository.findById(id);
    }
    public List<AutoparteModel> findAutopartesByNombre(String nombre){
        return autoparteRepository.findByNombreContaining(nombre);
    }
    public List<AutoparteModel> findAutopartesByMarca(String marca){
        return autoparteRepository.findByMarcaContaining(marca);
    }
    public List<AutoparteModel> findAutopartesByCategoria(String categoria){
        return autoparteRepository.findByCategoriaContaining(categoria);
    }
    public AutoparteModel saveAutoparte(AutoparteModel autoparte) {
        return autoparteRepository.save(autoparte);
    }



    public String deleteAutoparteById(Long id) {
        if (autoparteRepository.existsById(id)) {
            autoparteRepository.deleteById(id);
            return "Autoparte eliminada exitosamente.";
        } else {
            throw new NoSuchElementException("No se encontró una autoparte con el ID especificado: " + id);
        }
    }

    // Editar una autoparte (sin permitir cambiar el ID)
    public AutoparteModel editAutoparte(AutoparteModel autoparte) {
        // Verificar si la autoparte existe
        Optional<AutoparteModel> existente = autoparteRepository.findById(autoparte.getIdAutoparte());

        if (existente.isPresent()) {
            AutoparteModel autoparteExistente = existente.get();

            // Actualizar los campos editables
            autoparteExistente.setNombre(autoparte.getNombre());
            autoparteExistente.setCantidadEnExistencia(autoparte.getCantidadEnExistencia());
            autoparteExistente.setPrecioUnitario(autoparte.getPrecioUnitario());
            autoparteExistente.setFechaDeRegistro(autoparte.getFechaDeRegistro());
            autoparteExistente.setProveedor(autoparte.getProveedor());
            autoparteExistente.setMarca(autoparte.getMarca());
            autoparteExistente.setModelo(autoparte.getModelo());
            autoparteExistente.setAnio(autoparte.getAnio());
            autoparteExistente.setCategoria(autoparte.getCategoria());
            autoparteExistente.setDescripcion(autoparte.getDescripcion());


            // Guardar los cambios
            return autoparteRepository.save(autoparteExistente);
        } else {
            throw new NoSuchElementException("No se encontró una autoparte con el ID especificado: " + autoparte.getIdAutoparte());
        }
    }

}
