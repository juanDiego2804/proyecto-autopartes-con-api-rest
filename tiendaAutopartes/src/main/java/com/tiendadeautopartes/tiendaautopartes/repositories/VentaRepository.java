package com.tiendadeautopartes.tiendaautopartes.repositories;

import com.tiendadeautopartes.tiendaautopartes.models.VentaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VentaRepository extends JpaRepository<VentaModel,Long> {
    // Encuentra ventas por cliente
    Optional<VentaModel> findByIdVenta(Long idVenta);

    List<VentaModel> findByFechaVenta(LocalDate fechaVenta);
    List<VentaModel> findByClienteIdCliente(Long idCliente);

    List<VentaModel> findByEmpleadoRfcEmpleado(String rfcEmpleado);
}
