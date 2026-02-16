package com.example.ticketbook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Bus Ticket Booking API is running! Access endpoints at /api/...";
    }
}
