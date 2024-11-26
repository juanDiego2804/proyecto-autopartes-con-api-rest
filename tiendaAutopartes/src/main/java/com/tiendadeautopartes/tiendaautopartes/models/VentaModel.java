package com.tiendadeautopartes.tiendaautopartes.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ventas")
public class VentaModel {
    @Id
    @Column(name = "id_venta",unique = true,nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)//es autoincrement
    private Long idVenta;
    @Column(name = "fecha_venta")
    private LocalDate fechaVenta;

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id_cliente", nullable = false)
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "rfc_empleado", referencedColumnName = "rfc_empleado", nullable = false)
    private EmpleadoModel empleado;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DetallesVentaModel> detallesVenta;

    private BigDecimal total;

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public LocalDate getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDate fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public EmpleadoModel getEmpleado() {
        return empleado;
    }

    public void setEmpleado(EmpleadoModel empleado) {
        this.empleado = empleado;
    }

    public List<DetallesVentaModel> getDetallesVenta() {
        return detallesVenta;
    }

    public void setDetallesVenta(List<DetallesVentaModel> detallesVenta) {
        this.detallesVenta = detallesVenta;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
