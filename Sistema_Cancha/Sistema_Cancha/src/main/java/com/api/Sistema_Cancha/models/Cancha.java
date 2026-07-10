package com.api.Sistema_Cancha.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Canchas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cancha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "Tipo", nullable = false, length = 50)
    private String tipo;

    @Column(name = "PrecioHora", nullable = false)
    private BigDecimal precioHora;

    @Column(name = "Estado", nullable = false, length = 20)
    @Builder.Default
    private String estado = "activa";

    @Column(name = "Descripcion", columnDefinition = "TEXT")
    private String descripcion;
}
