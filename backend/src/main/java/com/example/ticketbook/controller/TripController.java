package com.example.ticketbook.controller;

import com.example.ticketbook.entity.Trip;
import com.example.ticketbook.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @Autowired
    private TripService tripService;

    @GetMapping("/search")
    public List<Trip> searchTrips(@RequestParam String source,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return tripService.searchTrips(source, destination, date);
    }

    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        Trip trip = tripService.getTripById(id);
        if (trip == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trip);
    }

    @GetMapping("/{id}/track")
    public ResponseEntity<TripTrackResponse> trackTrip(@PathVariable Long id) {
        Trip trip = tripService.getTripById(id);
        if (trip == null) {
            return ResponseEntity.notFound().build();
        }
        TripTrackResponse response = new TripTrackResponse(
                "On Time",
                25,
                "Last updated " + LocalDateTime.now()
        );
        return ResponseEntity.ok(response);
    }

    public record TripTrackResponse(String status, Integer etaMinutes, String lastUpdated) {
    }
}
