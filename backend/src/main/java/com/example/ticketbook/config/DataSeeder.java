package com.example.ticketbook.config;

import com.example.ticketbook.entity.Bus;
import com.example.ticketbook.entity.Route;
import com.example.ticketbook.entity.Trip;
import com.example.ticketbook.entity.User;
import com.example.ticketbook.repository.BusRepository;
import com.example.ticketbook.repository.RouteRepository;
import com.example.ticketbook.repository.TripRepository;
import com.example.ticketbook.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    private final TripRepository tripRepository;

    public DataSeeder(UserRepository userRepository, BusRepository busRepository,
            RouteRepository routeRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.busRepository = busRepository;
        this.routeRepository = routeRepository;
        this.tripRepository = tripRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.findByEmail("admin@example.com")
                .map(existing -> {
                    existing.setName("Admin User");
                    existing.setPassword("admin123");
                    existing.setPhone("9999999999");
                    existing.setRole("ADMIN");
                    return userRepository.save(existing);
                })
                .orElseGet(() -> userRepository
                        .save(new User(null, "Admin User", "admin@example.com", "admin123", "9999999999", "ADMIN")));

        userRepository.findByEmail("test@example.com")
                .map(existing -> {
                    existing.setName("Test User");
                    existing.setPassword("user123");
                    existing.setPhone("8888888888");
                    existing.setRole("USER");
                    return userRepository.save(existing);
                })
                .orElseGet(() -> userRepository
                        .save(new User(null, "Test User", "test@example.com", "user123", "8888888888", "USER")));

        Bus bus1 = upsertBus(new Bus(null, "MH-01-AB-4321", "Orange Travels", "AC Sleeper", 30, 4.6,
                "WiFi, Charging Point, Blanket"));
        Bus bus2 = upsertBus(
                new Bus(null, "MH-02-XY-2211", "VRL Travels", "AC Seater", 40, 4.4, "Charging Point, Water Bottle"));
        Bus bus3 = upsertBus(new Bus(null, "KA-09-KL-8822", "SRS Travels", "Non-AC Seater", 45, 4.1, "Water Bottle"));
        Bus bus4 = upsertBus(new Bus(null, "DL-01-ZZ-9191", "IntrCity SmartBus", "AC Sleeper", 28, 4.7,
                "WiFi, Charging Point, GPS"));
        Bus bus5 = upsertBus(
                new Bus(null, "TN-01-CC-1203", "KPN Travels", "AC Sleeper", 32, 4.3, "Charging Point, Blanket"));
        Bus bus6 = upsertBus(
                new Bus(null, "AP-09-GN-7744", "Guntur Express", "AC Seater", 36, 4.2, "Charging Point, Water Bottle"));
        Bus bus7 = upsertBus(new Bus(null, "TS-07-HY-5522", "Deccan Travels", "AC Sleeper", 30, 4.5,
                "WiFi, Charging Point, Blanket"));
        Bus bus8 = upsertBus(new Bus(null, "GA-03-GA-3311", "Konkan Lines", "Non-AC Seater", 44, 4.0, "Water Bottle"));

        Route route1 = upsertRoute(new Route(null, "Mumbai", "Pune", 150.0));
        Route route2 = upsertRoute(new Route(null, "Bangalore", "Mysore", 145.0));
        Route route3 = upsertRoute(new Route(null, "Delhi", "Agra", 233.0));
        Route route4 = upsertRoute(new Route(null, "Chennai", "Bangalore", 346.0));
        Route route5 = upsertRoute(new Route(null, "Hyderabad", "Vijayawada", 270.0));
        Route route6 = upsertRoute(new Route(null, "Ahmedabad", "Udaipur", 260.0));
        Route route7 = upsertRoute(new Route(null, "Guntur", "Hyderabad", 300.0));
        Route route8 = upsertRoute(new Route(null, "Guntur", "Vijayawada", 38.0));
        Route route9 = upsertRoute(new Route(null, "Hyderabad", "Chennai", 627.0));
        Route route10 = upsertRoute(new Route(null, "Bangalore", "Mumbai", 984.0));
        Route route11 = upsertRoute(new Route(null, "Mumbai", "Goa", 590.0));
        Route route12 = upsertRoute(new Route(null, "Hyderabad", "Bangalore", 575.0));
        Route route13 = upsertRoute(new Route(null, "Vijayawada", "Chennai", 443.0));
        Route route14 = upsertRoute(new Route(null, "Guntur", "Bangalore", 600.0));

        LocalDateTime baseDay = LocalDateTime.now().withHour(8).withMinute(0).withSecond(0).withNano(0);
        int daysToSeed = 30;
        for (int dayOffset = 0; dayOffset < daysToSeed; dayOffset++) {
            LocalDateTime day = baseDay.plusDays(dayOffset);
            LocalDateTime nextDay = day.plusDays(1);

            upsertTrip(createTrip(bus1, route1, day.plusHours(1), day.plusHours(4), 550.0,
                    "Dadar, Thane, Kalyan", "Hinjewadi, Shivaji Nagar, Swargate"));
            upsertTrip(createTrip(bus2, route1, day.plusHours(6), day.plusHours(9), 480.0,
                    "Andheri, Borivali, Thane", "Wakad, Kothrud, Pune Station"));
            upsertTrip(createTrip(bus3, route2, day.plusHours(3), day.plusHours(6), 320.0,
                    "Majestic, Silk Board, Electronic City", "Mysore Bus Stand, Nazarbad"));
            upsertTrip(createTrip(bus4, route3, nextDay.plusHours(2), nextDay.plusHours(6), 620.0,
                    "Kashmere Gate ISBT, Dhaula Kuan", "Agra Idgah, Taj East Gate"));
            upsertTrip(createTrip(bus5, route4, nextDay.plusHours(4), nextDay.plusHours(10), 780.0,
                    "Koyambedu, Tambaram", "Majestic, Electronic City"));
            upsertTrip(createTrip(bus2, route5, day.plusHours(5), day.plusHours(9), 500.0,
                    "MGBS, Ameerpet, LB Nagar", "Pandit Nehru Bus Station, Benz Circle"));
            upsertTrip(createTrip(bus1, route6, nextDay.plusHours(1), nextDay.plusHours(6), 640.0,
                    "Paldi, Kalupur, SG Highway", "Udaipur City Station, Sukhadia Circle"));
            upsertTrip(createTrip(bus6, route7, day.plusHours(2), day.plusHours(7), 420.0,
                    "Guntur Bus Stand, Lakshmipuram", "MGBS, Miyapur, Kukatpally"));
            upsertTrip(createTrip(bus6, route8, day.plusHours(8), day.plusHours(9), 180.0,
                    "Guntur Bus Stand", "Pandit Nehru Bus Station"));
            upsertTrip(createTrip(bus7, route9, nextDay.plusHours(3), nextDay.plusHours(11), 950.0,
                    "MGBS, Secunderabad, LB Nagar", "Koyambedu, Tambaram"));
            upsertTrip(createTrip(bus3, route10, nextDay.plusHours(2), nextDay.plusHours(12), 1200.0,
                    "Majestic, Yeshwantpur", "Dadar, Borivali"));
            upsertTrip(createTrip(bus8, route11, day.plusHours(4), day.plusHours(12), 880.0,
                    "Dadar, Vashi, Panvel", "Mapusa, Panjim, Margao"));
            upsertTrip(createTrip(bus7, route12, day.plusHours(6), day.plusHours(12), 720.0,
                    "MGBS, Secunderabad", "Majestic, Electronic City"));
            upsertTrip(createTrip(bus5, route13, nextDay.plusHours(5), nextDay.plusHours(11), 650.0,
                    "Pandit Nehru Bus Station", "Koyambedu, Tambaram"));
            upsertTrip(createTrip(bus6, route14, day.plusHours(7), day.plusHours(15), 900.0,
                    "Guntur Bus Stand, Lakshmipuram", "Majestic, Electronic City, Whitefield"));
        }

        System.out.println("Data Seeded Successfully");
    }

    private Trip createTrip(Bus bus, Route route, LocalDateTime departure, LocalDateTime arrival,
            Double price, String boardingPoints, String droppingPoints) {
        Trip trip = new Trip();
        trip.setBus(bus);
        trip.setRoute(route);
        trip.setDepartureTime(departure);
        trip.setArrivalTime(arrival);
        trip.setPrice(price);
        trip.setBoardingPoints(boardingPoints);
        trip.setDroppingPoints(droppingPoints);
        trip.setAvailableSeats(bus.getTotalSeats());
        return trip;
    }

    private Bus upsertBus(Bus bus) {
        return busRepository.findAll().stream()
                .filter(existing -> existing.getBusNumber().equalsIgnoreCase(bus.getBusNumber()))
                .findFirst()
                .orElseGet(() -> busRepository.save(bus));
    }

    private Route upsertRoute(Route route) {
        return routeRepository.findBySourceAndDestination(route.getSource(), route.getDestination()).stream()
                .findFirst()
                .orElseGet(() -> routeRepository.save(route));
    }

    private void upsertTrip(Trip trip) {
        boolean exists = tripRepository.findAll().stream()
                .anyMatch(existing -> existing.getBus().getId().equals(trip.getBus().getId())
                        && existing.getRoute().getId().equals(trip.getRoute().getId())
                        && existing.getDepartureTime().equals(trip.getDepartureTime()));
        if (!exists) {
            tripRepository.save(trip);
        }
    }
}
