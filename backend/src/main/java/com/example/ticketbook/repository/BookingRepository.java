package com.example.ticketbook.repository;

import com.example.ticketbook.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByTripIdAndStatus(Long tripId, String status);
    boolean existsByTripIdAndSeatNumberAndStatus(Long tripId, Integer seatNumber, String status);
}
