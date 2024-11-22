package com.tiendadeautopartes.tiendaautopartes.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "empleados")
public class EmpleadoModel implements Serializable {
    @Id
    @Column(name = "rfc_empleado",unique = true,nullable = false)
    private String rfcEmpleado;
    private String nombre;
    private String apellidos;
    private String puesto;

    @OneToOne(mappedBy = "empleado", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private DatosEmpleadoModel datosEmpleado;
    //usamos mappedBy para indicar que la relación es bidireccional y está mapeada por el atributo empleado en la entidad DatosEmpleado.

    public String getRfcEmpleado() {
        return rfcEmpleado;
    }

    public void setRfcEmpleado(String rfcEmpleado) {
        this.rfcEmpleado = rfcEmpleado;
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

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public DatosEmpleadoModel getDatosEmpleado() {
        return datosEmpleado;
    }

    public void setDatosEmpleado(DatosEmpleadoModel datosEmpleado) {
        this.datosEmpleado = datosEmpleado;
    }
}
