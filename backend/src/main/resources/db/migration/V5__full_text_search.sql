-- =========================================================================
-- FLYWAY SCHEMA MIGRATION V5 - FULL TEXT SEARCH GIN INDEXES
-- =========================================================================

-- Create a functional GIN index on the destinations table for Full Text Search
CREATE INDEX idx_destinations_fts ON destinations USING gin(
    to_tsvector('english', name || ' ' || country || ' ' || COALESCE(description, ''))
);
