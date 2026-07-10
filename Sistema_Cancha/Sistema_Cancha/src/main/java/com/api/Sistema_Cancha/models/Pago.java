package com.api.Sistema_Cancha.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "ReservaId", unique = true)
    private Reserva reserva;

    @Column(name = "Monto", nullable = false)
    private BigDecimal monto;

    @Column(name = "FechaPago", nullable = false)
    @Builder.Default
    private LocalDateTime fechaPago = LocalDateTime.now();

    @Column(name = "Metodo", nullable = false, length = 20)
    private String metodo;

    @Column(name = "Estado", nullable = false, length = 20)
    @Builder.Default
    private String estado = "completado";
}
