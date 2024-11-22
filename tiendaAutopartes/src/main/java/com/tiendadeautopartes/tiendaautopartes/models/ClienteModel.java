package com.tiendadeautopartes.tiendaautopartes.models;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class ClienteModel {
    @Id
    @Column(name = "id_cliente",unique = true,nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)//es autoincrement
    private Long idCliente;
    private String nombre;//no se les pone name de column porque es el mismo de la variable
    private String apellidos;
    private String telefono;

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
