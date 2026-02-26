package com.example.ticketbook.service;

import com.example.ticketbook.entity.Booking;
import com.example.ticketbook.entity.Trip;
import com.example.ticketbook.entity.User;
import com.example.ticketbook.repository.BookingRepository;
import com.example.ticketbook.repository.TripRepository;
import com.example.ticketbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(Long userId, Long tripId, String seatNumbers,
            String passengerName, Integer passengerAge, String passengerGender,
            String email, String boardingPoint, String droppingPoint, Double totalAmount) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new RuntimeException("Trip not found"));

        String[] seats = seatNumbers.split(",");
        for (String seat : seats) {
            int seatNum = Integer.parseInt(seat.trim());
            boolean seatTaken = bookingRepository.existsByTripIdAndSeatNumberAndStatus(tripId, seatNum, "BOOKED");
            if (seatTaken) {
                throw new RuntimeException("Seat " + seatNum + " is already booked");
            }
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrip(trip);
        booking.setSeatNumber(Integer.parseInt(seats[0].trim()));
        booking.setSeatNumbers(seatNumbers);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("BOOKED");
        booking.setPassengerName(passengerName);
        booking.setPassengerAge(passengerAge);
        booking.setPassengerGender(passengerGender);
        booking.setEmail(email);
        booking.setBoardingPoint(boardingPoint);
        booking.setDroppingPoint(droppingPoint);
        booking.setTotalAmount(totalAmount != null ? totalAmount : trip.getPrice() * seats.length);

        return bookingRepository.save(booking);
    }

    public Booking createBooking(Long userId, Long tripId, Integer seatNumber) {
        return createBooking(userId, tripId, String.valueOf(seatNumber),
                null, null, null, null, null, null, null);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Integer> getBookedSeats(Long tripId) {
        return bookingRepository.findByTripIdAndStatus(tripId, "BOOKED")
                .stream()
                .map(Booking::getSeatNumber)
                .toList();
    }

    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }
}
