package com.example.ticketbook.repository;

import com.example.ticketbook.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("SELECT t FROM Trip t WHERE LOWER(t.route.source) = LOWER(:source) AND LOWER(t.route.destination) = LOWER(:destination) AND t.departureTime BETWEEN :start AND :end")
    List<Trip> searchTrips(@Param("source") String source,
            @Param("destination") String destination,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);
}
