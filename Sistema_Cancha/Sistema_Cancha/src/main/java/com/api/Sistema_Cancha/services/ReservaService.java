package com.api.Sistema_Cancha.services;

import com.api.Sistema_Cancha.models.Cancha;
import com.api.Sistema_Cancha.models.Reserva;
import com.api.Sistema_Cancha.repositories.CanchaRepository;
import com.api.Sistema_Cancha.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private CanchaRepository canchaRepository;

    public Reserva crearReserva(Reserva reserva) {
        // Regla: No se pueda reservar una cancha deshabilitada.
        Cancha cancha = canchaRepository.findById(reserva.getCancha().getId())
                .orElseThrow(() -> new RuntimeException("Cancha no encontrada"));
        
        if (!"activa".equals(cancha.getEstado())) {
            throw new RuntimeException("La cancha no está activa, no se puede reservar");
        }

        // Regla: No existan dos reservas para la misma cancha en el mismo horario.
        List<Reserva> solapamientos = reservaRepository.findOverlappingReservations(
                cancha.getId(),
                reserva.getFechaReserva(),
                reserva.getHoraInicio(),
                reserva.getHoraFin()
        );

        if (!solapamientos.isEmpty()) {
            throw new RuntimeException("Ya existe una reserva para esa cancha en el horario seleccionado");
        }

        if (reserva.getFechaCreacion() == null) {
            reserva.setFechaCreacion(java.time.LocalDateTime.now());
        }
        
        // Calcular horas
        long minutos = java.time.Duration.between(reserva.getHoraInicio(), reserva.getHoraFin()).toMinutes();
        java.math.BigDecimal horas = new java.math.BigDecimal(minutos).divide(new java.math.BigDecimal(60), 2, java.math.RoundingMode.HALF_UP);
        reserva.setTotal(cancha.getPrecioHora().multiply(horas));

        reserva.setEstado("pendiente");
        return reservaRepository.save(reserva);
    }

    public Reserva cancelarReserva(Long id) {
        return reservaRepository.findById(id).map(reserva -> {
            reserva.setEstado("cancelada");
            return reservaRepository.save(reserva);
        }).orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
    }

    public List<Reserva> consultarReservas() {
        return reservaRepository.findAll();
    }
    
    public Optional<Reserva> obtenerReservaPorId(Long id) {
        return reservaRepository.findById(id);
    }
}
