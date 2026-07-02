-- =========================================================================
-- FLYWAY MIGRATION V6 - FIX ALL SCHEMA MISMATCHES (ENTITIES vs TABLES)
-- =========================================================================

-- -------------------------------------------------------------------------
-- FIX 1: attractions - add entry_fee column
-- -------------------------------------------------------------------------
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS entry_fee DOUBLE PRECISION DEFAULT 0.0;

-- -------------------------------------------------------------------------
-- FIX 2: budgets - entire table missing
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS budgets (
    id           BIGSERIAL PRIMARY KEY,
    trip_id      UUID REFERENCES trips(id) ON DELETE CASCADE,
    total_limit  DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    spent_amount DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    category     VARCHAR(50) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_budget_trip ON budgets(trip_id);

-- -------------------------------------------------------------------------
-- FIX 3: travelers - entire table missing
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS travelers (
    id      BIGSERIAL PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE,
    name    VARCHAR(100) NOT NULL,
    type    VARCHAR(50)  NOT NULL,
    age     INT
);
CREATE INDEX IF NOT EXISTS idx_traveler_trip ON travelers(trip_id);

-- -------------------------------------------------------------------------
-- FIX 4: hotels - add stars column
-- -------------------------------------------------------------------------
ALTER TABLE hotels ADD COLUMN IF NOT EXISTS stars INT DEFAULT 0;

-- -------------------------------------------------------------------------
-- FIX 5: restaurants - add price_level and cuisine_type columns
-- -------------------------------------------------------------------------
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS price_level INT DEFAULT 0;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(100);

-- -------------------------------------------------------------------------
-- FIX 6: notifications - add title and type columns
-- -------------------------------------------------------------------------
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS title VARCHAR(150);
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS type VARCHAR(50);

-- -------------------------------------------------------------------------
-- FIX 7: otps - add type column (entity uses "type", V1 had "purpose")
-- -------------------------------------------------------------------------
ALTER TABLE otps ADD COLUMN IF NOT EXISTS type VARCHAR(50);

-- -------------------------------------------------------------------------
-- FIX 8: wishlists - add added_at column (entity has @PrePersist addedAt)
-- -------------------------------------------------------------------------
ALTER TABLE wishlists ADD COLUMN IF NOT EXISTS added_at TIMESTAMP;

-- -------------------------------------------------------------------------
-- FIX 9: preferences - add budget_category, group_type, duration columns
--         (V1 had interests/budget_preference, entity uses different names)
-- -------------------------------------------------------------------------
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS budget_category VARCHAR(50);
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS group_type VARCHAR(50);
ALTER TABLE preferences ADD COLUMN IF NOT EXISTS duration VARCHAR(50);

-- -------------------------------------------------------------------------
-- FIX 10: preference_traveler_types - ElementCollection table missing
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS preference_traveler_types (
    preference_id BIGINT REFERENCES preferences(id) ON DELETE CASCADE,
    traveler_type VARCHAR(100)
);
CREATE INDEX IF NOT EXISTS idx_pref_traveler_types ON preference_traveler_types(preference_id);

-- -------------------------------------------------------------------------
-- FIX 11: reviews - rating column is INT in V1 but entity expects DOUBLE PRECISION
-- -------------------------------------------------------------------------
ALTER TABLE reviews ALTER COLUMN rating TYPE DOUBLE PRECISION USING rating::DOUBLE PRECISION;

