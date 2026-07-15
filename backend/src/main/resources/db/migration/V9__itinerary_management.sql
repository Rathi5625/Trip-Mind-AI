-- 1. Activity Categories table
CREATE TABLE IF NOT EXISTS activity_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Activity Notes table
CREATE TABLE IF NOT EXISTS activity_notes (
    id BIGSERIAL PRIMARY KEY,
    activity_id BIGINT REFERENCES activities(id) ON DELETE CASCADE,
    note TEXT NOT NULL
);

-- 3. Transport Routes table
CREATE TABLE IF NOT EXISTS transport_routes (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    origin VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    duration VARCHAR(50),
    distance VARCHAR(50)
);

-- 4. Transport Modes table
CREATE TABLE IF NOT EXISTS transport_modes (
    id BIGSERIAL PRIMARY KEY,
    route_id BIGINT REFERENCES transport_routes(id) ON DELETE CASCADE,
    mode VARCHAR(50) NOT NULL,
    duration_min INT NOT NULL
);

-- 5. Weather Forecasts table
CREATE TABLE IF NOT EXISTS weather_forecasts (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    temperature DOUBLE PRECISION NOT NULL,
    condition_text VARCHAR(100) NOT NULL,
    rain_prob DOUBLE PRECISION NOT NULL,
    uv_index DOUBLE PRECISION NOT NULL
);

-- 6. Crowd Predictions table
CREATE TABLE IF NOT EXISTS crowd_predictions (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    density_level VARCHAR(50) NOT NULL, -- LOW, MEDIUM, HIGH
    peak_hours VARCHAR(100) NOT NULL
);

-- 7. Trip Expenses table
CREATE TABLE IF NOT EXISTS trip_expenses (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- 8. Trip Budget table
CREATE TABLE IF NOT EXISTS trip_budget (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    total_budget DOUBLE PRECISION NOT NULL,
    spent_budget DOUBLE PRECISION NOT NULL
);

-- 9. Trip AI Recommendations table
CREATE TABLE IF NOT EXISTS trip_ai_recommendations (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    recommendation_text TEXT NOT NULL,
    savings_min INT NOT NULL,
    dismissed BOOLEAN DEFAULT FALSE
);

-- 10. Trip AI History table
CREATE TABLE IF NOT EXISTS trip_ai_history (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    command TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
