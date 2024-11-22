package com.tiendadeautopartes.tiendaautopartes.repositories;

import ch.qos.logback.core.net.server.Client;
import com.tiendadeautopartes.tiendaautopartes.models.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel,Long> {
    Optional<ClienteModel> findByTelefono(String telefono);
}
