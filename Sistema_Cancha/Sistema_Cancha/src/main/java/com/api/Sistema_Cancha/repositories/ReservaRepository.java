package com.api.Sistema_Cancha.repositories;

import com.api.Sistema_Cancha.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r FROM Reserva r WHERE r.cancha.id = :canchaId AND r.fechaReserva = :fechaReserva AND r.estado <> 'cancelada' AND (r.horaInicio < :horaFin AND r.horaFin > :horaInicio)")
    List<Reserva> findOverlappingReservations(
            @Param("canchaId") Long canchaId,
            @Param("fechaReserva") LocalDate fechaReserva,
            @Param("horaInicio") LocalTime horaInicio,
            @Param("horaFin") LocalTime horaFin
    );
    
    List<Reserva> findByEstado(String estado);
}
