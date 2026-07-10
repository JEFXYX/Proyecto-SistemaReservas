package com.api.Sistema_Cancha.controllers;

import com.api.Sistema_Cancha.models.Pago;
import com.api.Sistema_Cancha.services.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody Pago pago) {
        try {
            return ResponseEntity.ok(pagoService.registrarPago(pago));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Pago>> listar() {
        return ResponseEntity.ok(pagoService.consultarPagos());
    }
}
