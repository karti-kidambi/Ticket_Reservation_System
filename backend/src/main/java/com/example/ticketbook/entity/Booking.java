package com.example.ticketbook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private Trip trip;

    private Integer seatNumber; // Simplified seat representation

    private String seatNumbers; // Comma-separated for multi-seat, e.g. "1,2,3"

    private LocalDateTime bookingDate;

    private String status; // BOOKED, CANCELLED

    private String passengerName;

    private Integer passengerAge;

    private String passengerGender; // MALE, FEMALE, OTHER

    private String email;

    private String boardingPoint;

    private String droppingPoint;

    private Double totalAmount;
}
