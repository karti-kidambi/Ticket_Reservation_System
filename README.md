# TicketBook — Bus Ticket Reservation System

A full-stack bus ticket booking application built with Spring Boot and React. Users can search for bus trips across Indian cities, pick seats on a visual seat map, apply coupon codes, and manage their bookings.

## Tech Stack

| Layer     | Technology                      |
|-----------|---------------------------------|
| Backend   | Spring Boot 3.2, Java 21       |
| Database  | MySQL 8                        |
| ORM       | Spring Data JPA                |
| Frontend  | React 19, Vite                 |
| Styling   | TailwindCSS 4, CSS Variables   |
| HTTP      | Axios                          |

## Features

- Search buses by source, destination, and date
- Filter results by bus type, departure time, and price range
- Sort by price, departure, rating, or duration
- Visual seat selection (up to 6 seats per booking)
- Boarding and dropping point selection
- Coupon codes for discounts
- Booking confirmation with print and download
- Cancel bookings
- Bus tracking (mock data)
- Offers page
- FAQ and help section

## Prerequisites

- Java 21
- MySQL 8 running on port 3306
- Node.js 18+

## Getting Started

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`. On first run it seeds sample data (users, buses, routes, and trips for the next 30 days).

Default credentials:
- Admin: `admin@example.com` / `admin123`
- User: `test@example.com` / `user123`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server starts on `http://localhost:5173`.

## Database

The app connects to MySQL on `localhost:3306` with database `bus_booking`. It creates the database automatically if it doesn't exist. Default MySQL credentials are `root`/`root` — update `backend/src/main/resources/application.properties` if yours differ.

## Project Structure

```
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/ticketbook/
│       │   ├── config/          # Data seeder
│       │   ├── controller/      # REST endpoints
│       │   ├── entity/          # JPA entities
│       │   ├── repository/      # Data access
│       │   └── service/         # Business logic
│       └── resources/
│           └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/          # Layout
│   │   ├── pages/               # All page components
│   │   ├── api.js               # Axios config
│   │   ├── App.jsx              # Router
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```
