-- V11__normalize_schemas.sql
-- Normalize database schema, consolidate budgets/expenses, and add foreign key indexes

-- 1. Migrate existing stats budget data to trip_budget if a trip has stats but no budget entry yet
INSERT INTO trip_budget (trip_id, spent_budget, total_budget)
SELECT trip_id, COALESCE(spent_budget, 0.0), COALESCE(total_budget, 0.0)
FROM trip_stats ts
WHERE NOT EXISTS (
    SELECT 1 FROM trip_budget tb WHERE tb.trip_id = ts.trip_id
);

-- 2. Drop redundant columns from trip_stats
ALTER TABLE trip_stats DROP COLUMN IF EXISTS spent_budget;
ALTER TABLE trip_stats DROP COLUMN IF EXISTS total_budget;

-- 3. Drop redundant expenses table
DROP TABLE IF EXISTS trip_expenses;

-- 4. Create missing performance-optimizing indexes on all foreign key references
CREATE INDEX IF NOT EXISTS idx_activity_trip_day ON activities(trip_day_id);
CREATE INDEX IF NOT EXISTS idx_expense_trip ON expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_day_trip ON trip_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_progress_trip ON trip_progress(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_insight_trip ON trip_insights(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_stats_trip ON trip_stats(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_weather_trip ON trip_weather(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_ai_forecast_trip ON trip_ai_forecasts(trip_id);
CREATE INDEX IF NOT EXISTS idx_transport_route_trip ON transport_routes(trip_id);
CREATE INDEX IF NOT EXISTS idx_transport_mode_route ON transport_modes(route_id);
CREATE INDEX IF NOT EXISTS idx_weather_forecast_trip ON weather_forecasts(trip_id);
CREATE INDEX IF NOT EXISTS idx_crowd_prediction_trip ON crowd_predictions(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_budget_trip ON trip_budget(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_ai_recommendation_trip ON trip_ai_recommendations(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_ai_history_trip ON trip_ai_history(trip_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversation_trip ON ai_conversations(trip_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversation_user ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_prompt_history_user ON ai_prompt_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendation_trip ON ai_recommendations(trip_id);
CREATE INDEX IF NOT EXISTS idx_ai_optimization_result_trip ON ai_optimization_results(trip_id);
CREATE INDEX IF NOT EXISTS idx_ai_saved_trip_user ON ai_saved_trips(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_saved_trip_trip ON ai_saved_trips(trip_id);
CREATE INDEX IF NOT EXISTS idx_ai_travel_memory_user ON ai_travel_memories(user_id);
