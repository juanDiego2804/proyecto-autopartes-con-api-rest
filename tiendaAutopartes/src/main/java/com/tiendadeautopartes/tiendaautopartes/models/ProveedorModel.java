package com.tiendadeautopartes.tiendaautopartes.models;

import jakarta.persistence.*;

@Entity
@Table(name = "proveedores")
public class ProveedorModel {
    @Id
    @Column(name = "rfc_proveedor",unique = true,nullable = false)
    private String rfcProveedor;
    private String nombre;
    private String telefono;

    public String getRfcProveedor() {
        return rfcProveedor;
    }

    public void setRfcProveedor(String rfcProveedor) {
        this.rfcProveedor = rfcProveedor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Column(name = "correo_electronico")//lo tiene porque el nombre del campo en la BD no es igual
    private String correoElectronico;
    private String direccion;
}
