-- =========================================================================
-- FLYWAY DATA MIGRATION V2 - SEED CORE ROLES
-- =========================================================================

-- Seed Roles
INSERT INTO roles (name) VALUES 
('ROLE_USER'),
('ROLE_PRO'),
('ROLE_ADMIN')
ON CONFLICT (name) DO NOTHING;
