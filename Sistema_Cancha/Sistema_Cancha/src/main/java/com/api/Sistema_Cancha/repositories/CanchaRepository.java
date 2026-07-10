package com.api.Sistema_Cancha.repositories;

import com.api.Sistema_Cancha.models.Cancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Long> {
    List<Cancha> findByEstado(String estado);
}
