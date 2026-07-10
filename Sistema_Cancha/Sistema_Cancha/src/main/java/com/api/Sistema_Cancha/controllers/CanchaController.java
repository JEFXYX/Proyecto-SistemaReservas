package com.api.Sistema_Cancha.controllers;

import com.api.Sistema_Cancha.models.Cancha;
import com.api.Sistema_Cancha.services.CanchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canchas")
public class CanchaController {

    @Autowired
    private CanchaService canchaService;

    @PostMapping
    public ResponseEntity<Cancha> registrar(@RequestBody Cancha cancha) {
        return ResponseEntity.ok(canchaService.registrarCancha(cancha));
    }

    @GetMapping
    public ResponseEntity<List<Cancha>> listar() {
        return ResponseEntity.ok(canchaService.listarTodas());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Cancha>> listarDisponibles() {
        return ResponseEntity.ok(canchaService.consultarDisponibles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cancha> obtenerPorId(@PathVariable Long id) {
        return canchaService.obtenerCanchaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cancha> actualizar(@PathVariable Long id, @RequestBody Cancha cancha) {
        try {
            return ResponseEntity.ok(canchaService.actualizarCancha(id, cancha));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        canchaService.eliminarCancha(id);
        return ResponseEntity.noContent().build();
    }
}
