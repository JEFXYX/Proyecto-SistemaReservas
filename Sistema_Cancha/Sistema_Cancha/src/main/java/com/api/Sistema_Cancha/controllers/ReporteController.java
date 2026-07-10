package com.api.Sistema_Cancha.controllers;

import com.api.Sistema_Cancha.services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> obtenerReportes() {
        Map<String, Object> reportes = new HashMap<>();
        
        long totalReservas = reporteService.getTotalReservas();
        BigDecimal totalIngresos = reporteService.getTotalIngresos();
        Map<String, Long> topCanchas = reporteService.getCanchasMasUtilizadas();
        int ocupacionActual = reporteService.getOcupacionActual();

        reportes.put("totalReservas", totalReservas);
        reportes.put("totalIngresos", totalIngresos != null ? totalIngresos : BigDecimal.ZERO);
        reportes.put("canchasMasUtilizadas", topCanchas);
        reportes.put("ocupacionActual", ocupacionActual);

        return ResponseEntity.ok(reportes);
    }
}
