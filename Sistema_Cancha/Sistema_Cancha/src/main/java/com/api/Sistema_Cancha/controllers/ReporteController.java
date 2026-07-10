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

    @GetMapping("/descargar")
    public ResponseEntity<byte[]> descargarReporte() {
        String csvData = reporteService.generarReporteReservasCsv();
        byte[] output = csvData.getBytes();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=reporte_reservas.csv");
        headers.set(org.springframework.http.HttpHeaders.CONTENT_TYPE, "text/csv");
        return new ResponseEntity<>(output, headers, org.springframework.http.HttpStatus.OK);
    }
}
