package com.api.Sistema_Cancha.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reservas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ClienteId")
    private Cliente cliente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CanchaId")
    private Cancha cancha;

    @Column(name = "FechaReserva", nullable = false)
    private LocalDate fechaReserva;

    @Column(name = "HoraInicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "HoraFin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "Estado", nullable = false, length = 20)
    @Builder.Default
    private String estado = "pendiente";

    @Column(name = "Total", nullable = false)
    private BigDecimal total;

    @Column(name = "FechaCreacion", nullable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
