-- 1. Activities table
CREATE TABLE IF NOT EXISTS activities (
    id BIGSERIAL PRIMARY KEY,
    trip_day_id BIGINT REFERENCES trip_days(id) ON DELETE CASCADE,
    time VARCHAR(50),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100),
    duration VARCHAR(50),
    budget DOUBLE PRECISION,
    address VARCHAR(255),
    rating DOUBLE PRECISION
);

-- 2. Trip Progress table
CREATE TABLE IF NOT EXISTS trip_progress (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    progress_percent INT DEFAULT 0,
    tasks_remaining TEXT
);

-- 3. Trip Insights table
CREATE TABLE IF NOT EXISTS trip_insights (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    type VARCHAR(50),
    title VARCHAR(150),
    description TEXT,
    icon VARCHAR(50)
);

-- 4. Trip Stats table
CREATE TABLE IF NOT EXISTS trip_stats (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    countdown_days INT,
    ai_score INT,
    spent_budget DOUBLE PRECISION,
    total_budget DOUBLE PRECISION,
    status_badge VARCHAR(50)
);

-- 5. Trip Weather table
CREATE TABLE IF NOT EXISTS trip_weather (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    temperature DOUBLE PRECISION,
    currency VARCHAR(10),
    timezone VARCHAR(50),
    safety_rating DOUBLE PRECISION
);

-- 6. Trip AI Forecasts table
CREATE TABLE IF NOT EXISTS trip_ai_forecasts (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    forecast_text TEXT,
    category VARCHAR(50)
);

-- 7. Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    category VARCHAR(50),
    date DATE
);
