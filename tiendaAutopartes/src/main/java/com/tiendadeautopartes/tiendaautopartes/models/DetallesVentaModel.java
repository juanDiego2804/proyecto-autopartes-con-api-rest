package com.tiendadeautopartes.tiendaautopartes.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "detalles_ventas")
public class DetallesVentaModel {
    @Id
    @Column(name = "id_detalle_venta",unique = true,nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)//es autoincrement
    private Long idDetalleVenta;

    @ManyToOne
    @JoinColumn(name = "id_venta", referencedColumnName = "id_venta", nullable = false)
    private VentaModel venta;

    @ManyToOne
    @JoinColumn(name = "id_autoparte", referencedColumnName = "id_autoparte", nullable = false)
    private AutoparteModel autoparte;


    private int cantidad;
    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public Long getIdDetalleVenta() {
        return idDetalleVenta;
    }

    public void setIdDetalleVenta(Long idDetalleVenta) {
        this.idDetalleVenta = idDetalleVenta;
    }

    public VentaModel getVenta() {
        return venta;
    }

    public void setVenta(VentaModel venta) {
        this.venta = venta;
    }

    public AutoparteModel getAutoparte() {
        return autoparte;
    }

    public void setAutoparte(AutoparteModel autoparte) {
        this.autoparte = autoparte;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
