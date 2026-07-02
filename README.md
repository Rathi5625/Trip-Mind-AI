# Trip Mind AI — Local Development Setup

Trip Mind AI is an AI-driven travel planning platform built with Next.js, Spring Boot, and PostgreSQL.

---

## 🛠️ Prerequisites
Ensure the following tools are installed locally on your system:
- **Java 21** & **Maven 3.9+**
- **Node.js 20+** & **npm**
- **PostgreSQL 17+** (with a running instance on port `5432`)
- **Git**

---

## 🗄️ 1. PostgreSQL Database Setup
1. Open your PostgreSQL command line tool (`psql`) or a database GUI (like pgAdmin / DBeaver).
2. Create the database:
   ```sql
   CREATE DATABASE tripmind_db;
   ```
3. Create a user `postgres` with password `postgres` (or modify your backend environment variables to match your custom local database credentials).

---

## 📡 2. Backend Setup & Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your local environment variables in `backend/.env` (use `backend/.env.example` as a template):
   ```env
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=postgres
   GEMINI_API_KEY=your-gemini-key
   WEATHER_API_KEY=your-weather-key
   ```
3. Build and launch the Spring Boot server:
   ```bash
   mvn spring-boot:run
   ```
   *The server starts on `http://localhost:8080` and Flyway automatically runs database migrations on startup.*

---

## 🎨 3. Frontend Setup & Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The client application opens on `http://localhost:3000`.*
