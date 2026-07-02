-- =========================================================================
-- TRIP MIND AI - POSTGRESQL SEED DATA SCRIPT
-- =========================================================================

-- Seed Roles
INSERT INTO roles (name) VALUES 
('ROLE_USER'),
('ROLE_PRO'),
('ROLE_ADMIN')
ON CONFLICT (name) DO NOTHING;

-- Seed Destinations catalog (Subset of seeder data for schema execution verification)
INSERT INTO destinations (id, name, country, image_url, description, average_budget, average_budget_value, best_season, rating, ai_match, weather_temp, weather_text, safety_index, crowd_score) VALUES
('tokyo', 'Tokyo', 'Japan', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', 'A high-tech megacity blended with shrines.', '₹1.5L', 150000.0, 'March-May', 4.8, 98, '15°C–22°C', 'Sunny', 90, 80),
('paris', 'Paris', 'France', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 'The world-famous capital of art, fashion, and food.', '₹1.8L', 180000.0, 'June-August', 4.7, 95, '18°C–26°C', 'Partly Cloudy', 85, 90),
('bali', 'Bali', 'Indonesia', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', 'A tropical paradise known for forested volcanic mountains.', '₹80K', 80000.0, 'April-October', 4.6, 92, '26°C–32°C', 'Tropical Rain', 88, 75)
ON CONFLICT (id) DO NOTHING;

-- Seed Categories
INSERT INTO destination_categories (destination_id, category) VALUES
('tokyo', 'city-explorer'),
('tokyo', 'food-enthusiast'),
('paris', 'cultural-visitor'),
('paris', 'luxury-traveler'),
('bali', 'beach-lover'),
('bali', 'nature-explorer')
ON CONFLICT DO NOTHING;
