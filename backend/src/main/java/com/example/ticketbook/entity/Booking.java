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

    private Integer seatNumber;
    private String seatNumbers;
    private LocalDateTime bookingDate;
    private String status;
    private String passengerName;
    private Integer passengerAge;
    private String passengerGender;
    private String email;
    private String boardingPoint;
    private String droppingPoint;
    private Double totalAmount;
}
