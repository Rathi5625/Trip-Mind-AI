package com.tripmind.api.services.ai;

public class PromptTemplates {

    public static String getItineraryGenerationPrompt(String destination, int days, String budget, String pace, String travelers) {
        return String.format(
                "Act as a professional AI travel planner. Generate a highly detailed, day-by-day travel itinerary for %s for a duration of %d days.\n" +
                "Trip constraints:\n" +
                "- Budget Category: %s\n" +
                "- Pace: %s\n" +
                "- Travelers: %s\n\n" +
                "Provide recommendations for morning, afternoon, evening, and night activities. " +
                "Include details on hotels, restaurants, walking distances, and local secret insights.",
                destination, days, budget, pace, travelers
        );
    }

    public static String getBudgetOptimizationPrompt(String destination, double currentBudget, String targetCategory) {
        return String.format(
                "Optimize the travel budget for a trip to %s. Current estimated cost is ₹%.2f. " +
                "Recommend specific saving tips, flight price drop alternatives, and cheaper hotel tiers to transition into a %s budget level.",
                destination, currentBudget, targetCategory
        );
    }

    public static String getPackingRecommendationPrompt(String destination, String season) {
        return String.format(
                "Generate a specialized packing checklist for a trip to %s during the %s season. " +
                "Categorize into: Clothing, Electronics, Personal Care, and Travel Documents.",
                destination, season
        );
    }

    public static String getChatResponsePrompt(String tripContext, String userMessage, String conversationHistory) {
        return String.format(
                "You are VoyageAI, a helpful, premium AI travel assistant. " +
                "Current Trip context:\n%s\n\n" +
                "Conversation history:\n%s\n\n" +
                "User: %s\n" +
                "VoyageAI:",
                tripContext, conversationHistory, userMessage
        );
    }
}
