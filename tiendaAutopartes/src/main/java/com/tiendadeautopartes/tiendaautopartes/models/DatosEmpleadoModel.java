package com.tiendadeautopartes.tiendaautopartes.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "datos_de_empleados")
public class DatosEmpleadoModel implements Serializable {
    @Id
    @Column(name = "nss", nullable = false, unique = true)
    private String nss;
    @Column(name = "rfc_empleado", nullable = false)
    private String rfcEmpleado;// Solo un campo normal, no una relación inversa
    private String telefono;
    @Column(name = "correo_electronico")
    private String correoElectronico;
    @Column(name = "fecha_contratacion")
    private LocalDate fechaContratacion;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    public String getRfcEmpleado() {
        return rfcEmpleado;
    }

    public void setRfcEmpleado(String rfcEmpleado) {
        this.rfcEmpleado = rfcEmpleado;
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

    public LocalDate getFechaContratacion() {
        return fechaContratacion;
    }

    public void setFechaContratacion(LocalDate fechaContratacion) {
        this.fechaContratacion = fechaContratacion;
    }

    public String getNss() {
        return nss;
    }

    public void setNss(String nss) {
        this.nss = nss;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

}
