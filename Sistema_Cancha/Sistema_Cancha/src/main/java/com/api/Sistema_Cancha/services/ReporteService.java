package com.api.Sistema_Cancha.services;

import com.api.Sistema_Cancha.models.Pago;
import com.api.Sistema_Cancha.models.Reserva;
import com.api.Sistema_Cancha.repositories.PagoRepository;
import com.api.Sistema_Cancha.repositories.ReservaRepository;
import com.api.Sistema_Cancha.repositories.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private CanchaRepository canchaRepository;

    public long getTotalReservas() {
        return reservaRepository.count();
    }

    public BigDecimal getTotalIngresos() {
        return pagoRepository.findAll().stream()
                .map(Pago::getMonto)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, Long> getCanchasMasUtilizadas() {
        List<Reserva> reservas = reservaRepository.findAll();
        
        Map<String, Long> conteoCanchas = reservas.stream()
                .filter(r -> !"cancelada".equals(r.getEstado()))
                .collect(Collectors.groupingBy(r -> r.getCancha().getNombre(), Collectors.counting()));

        // Ordenar de mayor a menor uso
        return conteoCanchas.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        java.util.LinkedHashMap::new
                ));
    }

    public int getOcupacionActual() {
        long totalCanchas = canchaRepository.count();
        if (totalCanchas == 0) return 0;
        
        long reservasActivas = reservaRepository.findAll().stream()
                .filter(r -> !"cancelada".equals(r.getEstado()))
                .count();
                
        if (reservasActivas == 0) return 0;
        
        // Simular capacidad de 10 reservas por cancha al día
        int ocupacion = (int) ((reservasActivas * 100) / (totalCanchas * 10)); 
        return Math.min(100, Math.max(0, ocupacion));
    }

    public String generarReporteReservasCsv() {
        List<Reserva> reservas = reservaRepository.findAll();
        StringBuilder csv = new StringBuilder();
        csv.append("ID,Cliente,Cancha,Fecha Reserva,Hora Inicio,Hora Fin,Estado,Total,Fecha Creacion\n");
        for (Reserva r : reservas) {
            csv.append(r.getId()).append(",")
               .append(r.getCliente() != null ? r.getCliente().getNombre() + " " + r.getCliente().getApellido() : "").append(",")
               .append(r.getCancha() != null ? r.getCancha().getNombre() : "").append(",")
               .append(r.getFechaReserva()).append(",")
               .append(r.getHoraInicio()).append(",")
               .append(r.getHoraFin()).append(",")
               .append(r.getEstado()).append(",")
               .append(r.getTotal()).append(",")
               .append(r.getFechaCreacion()).append("\n");
        }
        return csv.toString();
    }
}
