# Trip Mind AI — Enterprise Travel Platform

Trip Mind AI is an AI-driven, real-time collaborative travel planning and booking platform built with Spring Boot 3.5+, PostgreSQL, Redis, STOMP WebSockets, and Next.js 16.

---

## 🏗️ Folder Structure

```
Trip-Mind-AI/
├── .github/workflows/   # CI/CD Pipelines
├── backend/             # Spring Boot REST API
│   ├── src/main/java/   # Core source code
│   └── src/resources/   # Application config & Flyway migrations
├── frontend/            # Next.js Application
├── nginx/               # Nginx Reverse Proxy Config
└── docker-compose.prod.yml
```

---

## 🚀 Environment Setup

### Prerequisites
- Java 21 & Maven 3.9+
- Node.js 20+ & npm
- PostgreSQL 17 & Redis 7

### Local Development
1. **Spin up Database & Redis**:
   ```bash
   docker-compose up -d
   ```
2. **Launch Backend REST API**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. **Launch Frontend Next.js client**:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📡 Core API Reference

### Authentication (`/api/auth`)
- `POST /api/auth/signup`: Create a traveler profile.
- `POST /api/auth/login`: Authenticate and obtain a JWT bearer token.
- `POST /api/auth/verify-otp`: Validate 6-digit session OTP.

### Travel Planners (`/api/trips`)
- `POST /api/trips`: Generate a travel plan via the Google Gemini AI integration.
- `GET /api/trips`: List user's active travel itineraries.

### Bookings & Checkouts (`/api/bookings`, `/api/payments`)
- `POST /api/bookings`: Create hotel, flight, or rental bookings.
- `POST /api/payments/checkout`: Process Stripe/Razorpay mock checkouts.
