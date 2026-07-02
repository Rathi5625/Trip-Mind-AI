-- =========================================================================
-- FLYWAY MIGRATION V7 - FIX RUNTIME CONSTRAINT ERRORS
-- Fixes NOT NULL constraints on legacy columns that block OTP generation
-- =========================================================================

-- -------------------------------------------------------------------------
-- FIX 1: otps table - make legacy columns (purpose, is_used, created_at)
--         nullable so they don't block INSERT when entity only sets 'type'
-- -------------------------------------------------------------------------
ALTER TABLE otps ALTER COLUMN purpose DROP NOT NULL;
ALTER TABLE otps ALTER COLUMN is_used DROP NOT NULL;
ALTER TABLE otps ALTER COLUMN created_at DROP NOT NULL;

-- -------------------------------------------------------------------------
-- FIX 2: notifications - make legacy 'message' column allow null since
--         entity sets 'message' via columnDefinition TEXT (nullable = false
--         only in entity, not a concern for existing empty rows)
-- -------------------------------------------------------------------------
-- notifications.message is still NOT NULL by entity design, no change needed.

-- -------------------------------------------------------------------------
-- FIX 3: wishlists - make added_at nullable at DB level (entity uses @PrePersist)
-- -------------------------------------------------------------------------
ALTER TABLE wishlists ALTER COLUMN added_at DROP NOT NULL;
