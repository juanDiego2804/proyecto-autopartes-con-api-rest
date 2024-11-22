package com.tiendadeautopartes.tiendaautopartes.services;

import com.tiendadeautopartes.tiendaautopartes.models.AutoparteModel;
import com.tiendadeautopartes.tiendaautopartes.models.ProveedorModel;
import com.tiendadeautopartes.tiendaautopartes.repositories.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {
    @Autowired
    ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public ProveedorModel saveProveedor(ProveedorModel proveedor) {
        Optional<ProveedorModel> proveedorExistente = proveedorRepository.findByRfcProveedor(proveedor.getRfcProveedor());

        if (proveedorExistente.isPresent()) {
            throw new IllegalArgumentException("Ya existe un proveedor con este RFC proporcionado: " + proveedor.getRfcProveedor());
        }

        return proveedorRepository.save(proveedor);
    }
    public Optional<ProveedorModel> findProveedorByRfc(String rfc){
        return proveedorRepository.findByRfcProveedor(rfc);
    }

    public List<ProveedorModel> getAllProveedores() {
        return proveedorRepository.findAll();
    }

}
