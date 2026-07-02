-- =========================================================================
-- FLYWAY SCHEMA MIGRATION V3 - ENTERPRISE SYSTEMS
-- =========================================================================

-- 1. Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
    resource_type VARCHAR(50) NOT NULL, -- HOTEL, FLIGHT, RESTAURANT, CAR_RENTAL, TRANSFER, INSURANCE, TRAIN, BUS
    resource_name VARCHAR(150) NOT NULL,
    reference_number VARCHAR(100) UNIQUE NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL, -- PENDING, CONFIRMED, CANCELLED
    details TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
CREATE INDEX idx_booking_user ON bookings(user_id);
CREATE INDEX idx_booking_trip ON bookings(trip_id);

-- 2. Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DOUBLE PRECISION NOT NULL,
    currency VARCHAR(10) NOT NULL,
    gateway VARCHAR(50) NOT NULL, -- STRIPE, RAZORPAY, PAYPAL, UPI, CREDIT_CARD
    status VARCHAR(50) NOT NULL, -- PENDING, COMPLETED, FAILED, REFUNDED
    transaction_reference VARCHAR(150) UNIQUE,
    invoice_url VARCHAR(500),
    receipt_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- 3. Shared Trips (Collaboration)
CREATE TABLE shared_trips (
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL, -- OWNER, EDITOR, VIEW_ONLY
    PRIMARY KEY (trip_id, user_id)
);

-- 4. Trip Comments
CREATE TABLE trip_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- 5. Uploaded Files (Documents & Attachments)
CREATE TABLE uploaded_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- PASSPORT, VISA, TICKET, RESERVATION, INSURANCE, PHOTO, RECEIPT
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP NOT NULL
);

-- 6. Audit Logs (Security Events)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(150) NOT NULL,
    ip_address VARCHAR(50),
    details TEXT,
    created_at TIMESTAMP NOT NULL
);

-- 7. Analytics Events
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL, -- REVENUE, SEARCH, DURATION, PERFORMANCE
    event_type VARCHAR(100) NOT NULL,
    value DOUBLE PRECISION,
    details TEXT,
    created_at TIMESTAMP NOT NULL
);
