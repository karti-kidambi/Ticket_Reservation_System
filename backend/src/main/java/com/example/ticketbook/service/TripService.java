package com.example.ticketbook.service;

import com.example.ticketbook.entity.Trip;
import com.example.ticketbook.repository.RouteRepository;
import com.example.ticketbook.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private RouteRepository routeRepository;

    public List<Trip> searchTrips(String source, String destination, LocalDate date,
            String sortBy, String busType, Integer departureAfter, Integer departureBefore,
            Double minPrice, Double maxPrice) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);
        List<Trip> trips = tripRepository.searchTrips(normalizeCity(source), normalizeCity(destination), startOfDay,
                endOfDay);

        Stream<Trip> stream = trips.stream();

        // Filter by bus type
        if (busType != null && !busType.isEmpty()) {
            stream = stream.filter(t -> t.getBus().getType().equalsIgnoreCase(busType));
        }

        // Filter by departure hour range
        if (departureAfter != null) {
            stream = stream.filter(t -> t.getDepartureTime().getHour() >= departureAfter);
        }
        if (departureBefore != null) {
            stream = stream.filter(t -> t.getDepartureTime().getHour() < departureBefore);
        }

        // Filter by price range
        if (minPrice != null) {
            stream = stream.filter(t -> t.getPrice() >= minPrice);
        }
        if (maxPrice != null) {
            stream = stream.filter(t -> t.getPrice() <= maxPrice);
        }

        // Sort
        if (sortBy != null) {
            switch (sortBy.toLowerCase()) {
                case "price":
                    stream = stream.sorted(Comparator.comparing(Trip::getPrice));
                    break;
                case "departure":
                    stream = stream.sorted(Comparator.comparing(Trip::getDepartureTime));
                    break;
                case "rating":
                    stream = stream.sorted(Comparator.comparing((Trip t) -> t.getBus().getRating()).reversed());
                    break;
                case "duration":
                    stream = stream.sorted(Comparator
                            .comparing(t -> Duration.between(t.getDepartureTime(), t.getArrivalTime()).toMinutes()));
                    break;
                default:
                    stream = stream.sorted(Comparator.comparing(Trip::getDepartureTime));
            }
        }

        return stream.collect(Collectors.toList());
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Trip getTripById(Long id) {
        return tripRepository.findById(id).orElse(null);
    }

    public List<String> searchCities(String query) {
        if (query == null || query.trim().length() < 1) {
            return List.of();
        }
        return routeRepository.findAll().stream()
                .flatMap(r -> Stream.of(r.getSource(), r.getDestination()))
                .distinct()
                .filter(city -> city.toLowerCase().contains(query.toLowerCase().trim()))
                .sorted()
                .collect(Collectors.toList());
    }

    public List<PopularRoute> getPopularRoutes() {
        return routeRepository.findAll().stream()
                .map(r -> new PopularRoute(r.getSource(), r.getDestination(), r.getDistance()))
                .collect(Collectors.toList());
    }

    private String normalizeCity(String city) {
        if (city == null) {
            return null;
        }
        String trimmed = city.trim();
        if (trimmed.equalsIgnoreCase("banglore")) {
            return "Bangalore";
        }
        if (trimmed.equalsIgnoreCase("bengaluru")) {
            return "Bangalore";
        }
        return trimmed;
    }

    public record PopularRoute(String source, String destination, Double distance) {
    }
}
