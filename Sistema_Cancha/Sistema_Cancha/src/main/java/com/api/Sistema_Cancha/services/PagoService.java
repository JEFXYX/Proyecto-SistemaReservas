package com.api.Sistema_Cancha.services;

import com.api.Sistema_Cancha.models.Pago;
import com.api.Sistema_Cancha.models.Reserva;
import com.api.Sistema_Cancha.repositories.PagoRepository;
import com.api.Sistema_Cancha.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    public Pago registrarPago(Pago pago) {
        // Regla: Solo puedan registrarse pagos de reservas existentes.
        Reserva reserva = reservaRepository.findById(pago.getReserva().getId())
                .orElseThrow(() -> new RuntimeException("La reserva no existe"));

        // Regla: Una reserva cancelada no pueda pagarse.
        if ("cancelada".equals(reserva.getEstado())) {
            throw new RuntimeException("No se puede pagar una reserva cancelada");
        }
        
        if ("completada".equals(reserva.getEstado()) || "confirmada".equals(reserva.getEstado())) {
            // Nota: En la tabla Reservas dice: 'pendiente', 'confirmada', 'cancelada'
            if ("confirmada".equals(reserva.getEstado())) {
               throw new RuntimeException("La reserva ya se encuentra confirmada o pagada");
            }
        }

        pago.setFechaPago(LocalDateTime.now());
        pago.setEstado("completado"); // Estado de tabla pagos
        
        Pago pagoGuardado = pagoRepository.save(pago);
        
        // Actualizar el estado de la reserva
        reserva.setEstado("confirmada");
        reservaRepository.save(reserva);

        return pagoGuardado;
    }

    public List<Pago> consultarPagos() {
        return pagoRepository.findAll();
    }
}
