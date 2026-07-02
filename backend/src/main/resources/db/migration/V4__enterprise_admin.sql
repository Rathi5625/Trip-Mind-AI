-- =========================================================================
-- FLYWAY SCHEMA MIGRATION V4 - ENTERPRISE ADMIN & PROMPT LIBRARY
-- =========================================================================

-- 1. Prompt Templates (AI Admin)
CREATE TABLE prompt_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL UNIQUE,
    version INTEGER NOT NULL DEFAULT 1,
    content TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    temperature DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    max_tokens INTEGER NOT NULL DEFAULT 2048,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 2. Content Moderation Rules
CREATE TABLE content_moderation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term VARCHAR(100) NOT NULL UNIQUE,
    classification VARCHAR(50) NOT NULL, -- SENSITIVE, BLOCKED
    created_at TIMESTAMP NOT NULL
);

-- 3. Coupons / Promo Codes
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percentage DOUBLE PRECISION NOT NULL,
    max_uses INTEGER NOT NULL DEFAULT 100,
    times_used INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL
);
