package com.tiendadeautopartes.tiendaautopartes.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "autopartes")
public class AutoparteModel {
    @Id
    @Column(name = "id_autoparte",unique = true,nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)//es autoincrement
    private Long idAutoparte;
    private String nombre;
    @Column(name = "cantidad_existencia")
    private int cantidadEnExistencia;
    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @Column(name = "fecha_registro")
    private LocalDate fechaDeRegistro;

    @ManyToOne
    @JoinColumn(name = "rfc_proveedor", referencedColumnName = "rfc_proveedor")
    @JsonBackReference //NUEVO
    private ProveedorModel proveedor;
    private String marca;
    private String modelo;
    private int anio;
    private String categoria;
    private String descripcion;

    public Long getIdAutoparte() {
        return idAutoparte;
    }

    public void setIdAutoparte(Long idAutoparte) {
        this.idAutoparte = idAutoparte;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCantidadEnExistencia() {
        return cantidadEnExistencia;
    }

    public void setCantidadEnExistencia(int cantidadEnExistencia) {
        this.cantidadEnExistencia = cantidadEnExistencia;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(BigDecimal precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public LocalDate getFechaDeRegistro() {
        return fechaDeRegistro;
    }

    public void setFechaDeRegistro(LocalDate fechaDeRegistro) {
        this.fechaDeRegistro = fechaDeRegistro;
    }

    public ProveedorModel getProveedor() {
        return proveedor;
    }

    public void setProveedor(ProveedorModel proveedor) {
        this.proveedor = proveedor;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
