package com.tiendadeautopartes.tiendaautopartes.repositories;

import com.tiendadeautopartes.tiendaautopartes.models.AutoparteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutoparteRepository extends JpaRepository<AutoparteModel,Long> {
    //son list porque pueden resultar varias autopartes de la busqueda
    List<AutoparteModel> findByNombreContaining(String nombre);
    List<AutoparteModel> findByMarcaContaining(String marca);
    List<AutoparteModel> findByCategoriaContaining(String categoria);

}
