package com.tiendadeautopartes.tiendaautopartes.services;

import com.tiendadeautopartes.tiendaautopartes.models.DetallesVentaModel;
import com.tiendadeautopartes.tiendaautopartes.models.VentaModel;
import com.tiendadeautopartes.tiendaautopartes.repositories.DetallesVentaRepository;
import com.tiendadeautopartes.tiendaautopartes.repositories.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class VentaService {
    @Autowired
    VentaRepository ventaRepository;

    @Autowired
    DetallesVentaRepository detallesVentaRepository;

    public VentaModel saveVenta(VentaModel venta) {
        // Validar que los detalles de la venta sean válidos
        validarDetallesVenta(venta.getDetallesVenta());

        // Calcular el total de la venta
        BigDecimal total = calcularTotal(venta.getDetallesVenta());
        venta.setTotal(total);

        // Persistir la venta (guarda automáticamente los detalles por CascadeType.ALL)
        return ventaRepository.save(venta);
    }



    public Optional<VentaModel> findVentaById(Long idVenta) {
        return ventaRepository.findById(idVenta);
    }

    // Eliminar una venta y todos sus detalles
    public String deleteVentaById(Long idVenta) {
        Optional<VentaModel> venta = ventaRepository.findById(idVenta);

        if (venta.isPresent()) {
            // Con CascadeType.ALL, basta con eliminar la venta y los detalles se eliminan automáticamente
            ventaRepository.deleteById(idVenta);
            return "Venta eliminada correctamente";
        } else {
            throw new IllegalArgumentException("No se encontró una venta con el ID proporcionado: " + idVenta);
        }
    }

    // Actualizar una venta (los detalles también se actualizan)
    public VentaModel updateVenta(Long idVenta, VentaModel nuevaVenta) {
        // Buscar la venta existente
        VentaModel ventaExistente = ventaRepository.findById(idVenta)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la venta con ID: " + idVenta));

        // Validar los detalles de la venta
        validarDetallesVenta(nuevaVenta.getDetallesVenta());

        // Actualizar los campos permitidos
        ventaExistente.setFechaVenta(nuevaVenta.getFechaVenta());
        ventaExistente.setCliente(nuevaVenta.getCliente());
        ventaExistente.setEmpleado(nuevaVenta.getEmpleado());
        ventaExistente.setDetallesVenta(nuevaVenta.getDetallesVenta());

        // Recalcular el total
        BigDecimal total = calcularTotal(nuevaVenta.getDetallesVenta());
        ventaExistente.setTotal(total);

        return ventaRepository.save(ventaExistente);
    }

    

    // Validar los detalles de una venta
    private void validarDetallesVenta(List<DetallesVentaModel> detalles) {
        if (detalles == null || detalles.isEmpty()) {
            throw new IllegalArgumentException("La venta debe incluir al menos un detalle.");
        }

        for (DetallesVentaModel detalle : detalles) {
            if (detalle.getCantidad() <= 0) {
                throw new IllegalArgumentException("La cantidad de cada detalle debe ser mayor a cero.");
            }

            if (detalle.getAutoparte() == null) {
                throw new IllegalArgumentException("Cada detalle debe incluir una autoparte válida.");
            }
        }
    }

    // Calcular el total de una venta a partir de los subtotales de los detalles
    private BigDecimal calcularTotal(List<DetallesVentaModel> detalles) {
        return detalles.stream()
                .map(DetallesVentaModel::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
