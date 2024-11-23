package com.tiendadeautopartes.tiendaautopartes.repositories;

import com.tiendadeautopartes.tiendaautopartes.models.EmpleadoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*DatosEmpleado está completamente subordinada a la entidad Empleados , ya que tienen una relación @OneToOne y comparten la clave primaria rfc_empleado se  crear un único repositorio para manejar ambas tablas. De este modo:

Consultas, inserciones y actualizaciones de un Empleado incluirán automáticamente los datos de DatosEmpleados, gracias a la relación definida con JPA.
PA se encargará de gestionar las operaciones sobre ambas tablas.
*/

@Repository
public interface EmpleadoRepository extends JpaRepository<EmpleadoModel,String> {//porque su "id" es el rfc tipo String


    // 1. Consulta con JOIN FETCH para cargar datos relacionados (Empleado + DatosEmpleado).
    @Query("SELECT e FROM EmpleadoModel e JOIN FETCH e.datosEmpleado WHERE e.rfcEmpleado = :rfcEmpleado")
    Optional<EmpleadoModel> findByRfcEmpleadoWithDatos(@Param("rfcEmpleado") String rfcEmpleado);
    // Busca un empleado por su ID (RFC). Puede no existir -> Optional.
    Optional<EmpleadoModel> findByRfcEmpleado(String rfcEmpleado);

    // Busca empleados por puesto. Puede devolver varios -> List.
    List<EmpleadoModel> findByPuesto(String puesto);

    List<EmpleadoModel> findByApellidos(String apellidos);
    List<EmpleadoModel> findByNombre(String nombre);

    // Consulta usando una relación unidireccional
    @Query("SELECT e FROM EmpleadoModel e WHERE e.datosEmpleado.correoElectronico = :correoElectronico")
    Optional<EmpleadoModel> findByCorreoElectronico(@Param("correoElectronico") String correoElectronico);
}
