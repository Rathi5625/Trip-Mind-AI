-- =========================================================================
-- FLYWAY SCHEMA MIGRATION V1 - UUID PRIMARY KEYS
-- =========================================================================

-- 1. Roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

-- 2. Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
CREATE INDEX idx_user_email ON users(email);

-- 3. User Roles (Many-to-Many)
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 4. Otps
CREATE TABLE otps (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    code VARCHAR(6) NOT NULL,
    purpose VARCHAR(50) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL
);

-- 5. Destinations
CREATE TABLE destinations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    average_budget VARCHAR(100),
    average_budget_value DOUBLE PRECISION,
    best_season VARCHAR(100),
    rating DOUBLE PRECISION,
    ai_match INT,
    weather_temp VARCHAR(50),
    weather_text VARCHAR(100),
    safety_index INT,
    crowd_score INT
);

-- 6. Destination Categories
CREATE TABLE destination_categories (
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    category VARCHAR(100),
    PRIMARY KEY (destination_id, category)
);

-- 7. Hotels
CREATE TABLE hotels (
    id BIGSERIAL PRIMARY KEY,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    rating DOUBLE PRECISION,
    price_per_night DOUBLE PRECISION,
    address VARCHAR(255),
    image_url VARCHAR(500),
    description TEXT
);

-- 8. Restaurants
CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    rating DOUBLE PRECISION,
    cuisine VARCHAR(100),
    price_range VARCHAR(50),
    address VARCHAR(255),
    image_url VARCHAR(500),
    description TEXT
);

-- 9. Attractions
CREATE TABLE attractions (
    id BIGSERIAL PRIMARY KEY,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    rating DOUBLE PRECISION,
    category VARCHAR(100),
    price DOUBLE PRECISION,
    address VARCHAR(255),
    image_url VARCHAR(500),
    description TEXT
);

-- 10. Trips
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    destination_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget_category VARCHAR(50),
    travelers_count INT,
    pace VARCHAR(50),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
CREATE INDEX idx_trip_user ON trips(user_id);

-- 11. Trip Days
CREATE TABLE trip_days (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    date DATE NOT NULL,
    description TEXT
);

-- 12. Transportations
CREATE TABLE transportations (
    id BIGSERIAL PRIMARY KEY,
    trip_day_id BIGINT REFERENCES trip_days(id) ON DELETE CASCADE,
    type VARCHAR(50),
    origin VARCHAR(150),
    destination VARCHAR(150),
    departure_time VARCHAR(50),
    arrival_time VARCHAR(50),
    cost DOUBLE PRECISION,
    duration VARCHAR(50)
);

-- 13. Saved Places
CREATE TABLE saved_places (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    place_type VARCHAR(50) NOT NULL,
    reference_id BIGINT,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(200),
    rating DOUBLE PRECISION,
    image_url VARCHAR(500),
    notes TEXT
);
CREATE INDEX idx_saved_place_user ON saved_places(user_id);

-- 14. Wishlists
CREATE TABLE wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE
);

-- 15. Notifications
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL
);

-- 16. Reviews
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP NOT NULL
);

-- 17. Weather Caches
CREATE TABLE weather_caches (
    id BIGSERIAL PRIMARY KEY,
    destination_id VARCHAR(50) REFERENCES destinations(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    temp_max DOUBLE PRECISION,
    temp_min DOUBLE PRECISION,
    condition_text VARCHAR(100),
    code VARCHAR(50),
    humidity DOUBLE PRECISION,
    wind_kph DOUBLE PRECISION
);

-- 18. Preferences
CREATE TABLE preferences (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interests TEXT,
    pace_preference VARCHAR(50),
    budget_preference VARCHAR(50)
);
