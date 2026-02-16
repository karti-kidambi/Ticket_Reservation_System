package com.example.ticketbook.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost:5173")
public class OfferController {

    @GetMapping
    public List<Offer> getOffers() {
        return List.of(
                new Offer("WELCOME100", "New user offer", "Get INR 100 off on your first booking."),
                new Offer("WEEKEND15", "Weekend deal", "Flat 15% off on Saturday and Sunday trips."),
                new Offer("NIGHT50", "Night travel", "Save INR 50 on overnight buses."),
                new Offer("SMARTBUS10", "SmartBus Special", "Extra 10% off on smart buses.")
        );
    }

    public record Offer(String code, String title, String description) {
    }
}
