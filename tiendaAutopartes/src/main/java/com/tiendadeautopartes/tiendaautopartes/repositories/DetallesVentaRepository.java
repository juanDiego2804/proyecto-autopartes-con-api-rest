package com.tiendadeautopartes.tiendaautopartes.repositories;

import com.tiendadeautopartes.tiendaautopartes.models.DetallesVentaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DetallesVentaRepository extends JpaRepository<DetallesVentaModel,Long> {
    Optional<DetallesVentaModel> findByIdDetalleVenta(Long idDetalleVenta);


    List<DetallesVentaModel> findByVentaIdVenta(Long idVenta);//porque son llaves foraneas, se va a ventas
    /*ls consulta SQL generada por JPA es
    SELECT * FROM detalles_ventas dv
    JOIN ventas v ON dv.id_venta = v.id_venta
    WHERE v.id_venta = :idVenta;*/


    List<DetallesVentaModel> findByAutoparteIdAutoparte(Long idAutoparte);//porque la variable en detalleVentaModel se llama Autoparte y es la que representa la relacion con la clase AutoparteModel
    /*la consulta SQL generada por Spring Data JPA seria
    SELECT *
    FROM detalles_ventas dv
    JOIN autopartes a ON dv.id_autoparte = a.id_autoparte
    WHERE a.id_autoparte = :idAutoparte;*/
}
