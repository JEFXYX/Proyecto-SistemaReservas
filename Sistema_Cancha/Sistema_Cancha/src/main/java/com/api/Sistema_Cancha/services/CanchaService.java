package com.api.Sistema_Cancha.services;

import com.api.Sistema_Cancha.models.Cancha;
import com.api.Sistema_Cancha.repositories.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CanchaService {

    @Autowired
    private CanchaRepository canchaRepository;

    public Cancha registrarCancha(Cancha cancha) {
        cancha.setEstado("activa");
        return canchaRepository.save(cancha);
    }

    public Cancha actualizarCancha(Long id, Cancha canchaActualizada) {
        return canchaRepository.findById(id).map(cancha -> {
            cancha.setNombre(canchaActualizada.getNombre());
            cancha.setTipo(canchaActualizada.getTipo());
            cancha.setPrecioHora(canchaActualizada.getPrecioHora());
            cancha.setEstado(canchaActualizada.getEstado());
            cancha.setDescripcion(canchaActualizada.getDescripcion());
            return canchaRepository.save(cancha);
        }).orElseThrow(() -> new RuntimeException("Cancha no encontrada"));
    }

    public void eliminarCancha(Long id) {
        canchaRepository.deleteById(id);
    }

    public List<Cancha> consultarDisponibles() {
        return canchaRepository.findByEstado("activa");
    }

    public List<Cancha> listarTodas() {
        return canchaRepository.findAll();
    }
    
    public Optional<Cancha> obtenerCanchaPorId(Long id) {
        return canchaRepository.findById(id);
    }
}
