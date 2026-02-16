package com.example.ticketbook.controller;

import com.example.ticketbook.entity.Booking;
import com.example.ticketbook.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Map<String, Object> body) {
        try {
            Long userId = Long.valueOf(body.get("userId").toString());
            Long tripId = Long.valueOf(body.get("tripId").toString());
            String seatNumbers = body.getOrDefault("seatNumbers", "").toString();
            String passengerName = body.getOrDefault("passengerName", "").toString();
            Integer passengerAge = body.containsKey("passengerAge") && body.get("passengerAge") != null
                    ? Integer.valueOf(body.get("passengerAge").toString())
                    : null;
            String passengerGender = body.getOrDefault("passengerGender", "").toString();
            String email = body.getOrDefault("email", "").toString();
            String boardingPoint = body.getOrDefault("boardingPoint", "").toString();
            String droppingPoint = body.getOrDefault("droppingPoint", "").toString();
            Double totalAmount = body.containsKey("totalAmount") && body.get("totalAmount") != null
                    ? Double.valueOf(body.get("totalAmount").toString())
                    : null;

            Booking booking = bookingService.createBooking(userId, tripId, seatNumbers,
                    passengerName, passengerAge, passengerGender, email,
                    boardingPoint, droppingPoint, totalAmount);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.getBookingById(bookingId);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    @GetMapping("/trip/{tripId}/seats")
    public List<Integer> getBookedSeats(@PathVariable Long tripId) {
        return bookingService.getBookedSeats(tripId);
    }

    @PatchMapping("/{bookingId}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long bookingId) {
        try {
            return ResponseEntity.ok(bookingService.cancelBooking(bookingId));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
