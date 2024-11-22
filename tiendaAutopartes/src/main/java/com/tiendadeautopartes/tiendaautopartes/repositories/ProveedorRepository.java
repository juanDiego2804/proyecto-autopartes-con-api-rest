package com.tiendadeautopartes.tiendaautopartes.repositories;

import com.tiendadeautopartes.tiendaautopartes.models.ProveedorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProveedorRepository extends JpaRepository<ProveedorModel,String> {//tipo y tipo del Id
    Optional<ProveedorModel> findByRfcProveedor(String rfcProveedor);
}
