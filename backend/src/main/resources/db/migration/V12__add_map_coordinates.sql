-- V12__add_map_coordinates.sql
-- Add double precision latitude and longitude columns and spatial indexes for dynamic mapping system

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE trips
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE hotels
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE attractions
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

ALTER TABLE saved_places
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_destinations_coords ON destinations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_trips_coords ON trips(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_activities_coords ON activities(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hotels_coords ON hotels(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_restaurants_coords ON restaurants(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_attractions_coords ON attractions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_saved_places_coords ON saved_places(latitude, longitude);
