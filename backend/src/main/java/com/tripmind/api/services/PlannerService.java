package com.tripmind.api.services;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PlannerService {

    public Map<String, Object> generateTripPlan(Map<String, String> request) {
        String prompt = request != null ? request.getOrDefault("prompt", "").toLowerCase() : "";
        Map<String, Object> result = new LinkedHashMap<>();
        Map<String, Object> destInfo = new LinkedHashMap<>();
        String itineraryText;

        if (prompt.contains("tokyo") || prompt.contains("japan")) {
            destInfo.put("name", "Tokyo, Japan");
            destInfo.put("image", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80");
            destInfo.put("temp", "19°C");
            destInfo.put("weather", "Clear");
            destInfo.put("crowdLevel", "High");

            Map<String, Double> budget = new LinkedHashMap<>();
            budget.put("flights", 95000.0);
            budget.put("hotels", 110000.0);
            budget.put("daily", 55000.0);
            budget.put("total", 260000.0);
            destInfo.put("budget", budget);

            Map<String, Object> savings = new LinkedHashMap<>();
            savings.put("estimated", 260000);
            savings.put("savings", 34000);
            savings.put("cheaperFlights", true);
            savings.put("betterHotels", true);
            savings.put("restaurantDeals", true);
            destInfo.put("savings", savings);

            Map<String, Object> travelScore = new LinkedHashMap<>();
            travelScore.put("score", 98);
            travelScore.put("weather", 5);
            travelScore.put("budget", 4);
            travelScore.put("safety", 5);
            travelScore.put("crowdLevel", 4);
            travelScore.put("recommendation", "Excellent Choice");
            destInfo.put("travelScore", travelScore);

            List<Map<String, Object>> markers = new ArrayList<>();
            markers.add(createMarker("Shibuya Crossing", 80, 190, "attraction"));
            markers.add(createMarker("Shinjuku Park", 120, 100, "attraction"));
            markers.add(createMarker("Tsukiji Market", 240, 220, "attraction"));
            markers.add(createMarker("Tokyo Grand Palace", 180, 150, "hotel"));
            destInfo.put("markers", markers);

            List<Map<String, Integer>> routes = new ArrayList<>();
            routes.add(createRoute(120, 100, 80, 190));
            routes.add(createRoute(80, 190, 240, 220));
            routes.add(createRoute(240, 220, 180, 150));
            destInfo.put("routes", routes);

            itineraryText = "## Tokyo Culinary & Culture Itinerary (5 Days)\n\n" +
                    "Here is your custom AI food tour itinerary:\n\n" +
                    "### Day 1: Shinjuku & Yakitori Alley\n" +
                    "- **Morning:** Land at Haneda, private transfer to Shinjuku.\n" +
                    "- **Afternoon:** Explore Gyoen National Garden for autumn leaves.\n" +
                    "- **Evening:** Dine in Omoide Yokocho (Memory Lane) for authentic yakitori and local sake.\n\n" +
                    "### Day 2: Tsukiji Outer Market & Tea Ceremony\n" +
                    "- **Morning:** Sushi breakfast crawl at Tsukiji. Try fresh uni and fatty tuna.\n" +
                    "- **Afternoon:** Participate in a traditional tea ceremony in Ginza.\n" +
                    "- **Evening:** Omakase dinner experience in Roppongi.\n\n" +
                    "### Day 3: Shibuya, Harajuku & Michelin Ramen\n" +
                    "- **Morning:** Cross Shibuya Scramble and explore Meiji Shrine.\n" +
                    "- **Afternoon:** Harajuku fashion walk, sweet crepes.\n" +
                    "- **Evening:** Michelin-starred Tonkotsu ramen at Konjiki Hototogisu.";
        } else if (prompt.contains("swiss") || prompt.contains("alps") || prompt.contains("switzerland")) {
            destInfo.put("name", "Swiss Alps, Switzerland");
            destInfo.put("image", "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80");
            destInfo.put("temp", "8°C");
            destInfo.put("weather", "Snowy");
            destInfo.put("crowdLevel", "Medium");

            Map<String, Double> budget = new LinkedHashMap<>();
            budget.put("flights", 120000.0);
            budget.put("hotels", 210000.0);
            budget.put("daily", 80000.0);
            budget.put("total", 410000.0);
            destInfo.put("budget", budget);

            Map<String, Object> savings = new LinkedHashMap<>();
            savings.put("estimated", 410000);
            savings.put("savings", 45000);
            savings.put("cheaperFlights", true);
            savings.put("betterHotels", true);
            savings.put("restaurantDeals", false);
            destInfo.put("savings", savings);

            Map<String, Object> travelScore = new LinkedHashMap<>();
            travelScore.put("score", 95);
            travelScore.put("weather", 5);
            travelScore.put("budget", 3);
            travelScore.put("safety", 5);
            travelScore.put("crowdLevel", 2);
            travelScore.put("recommendation", "Excellent Choice");
            destInfo.put("travelScore", travelScore);

            List<Map<String, Object>> markers = new ArrayList<>();
            markers.add(createMarker("Lucerne Station", 110, 100, "start"));
            markers.add(createMarker("Mt. Pilatus Peak", 150, 160, "attraction"));
            markers.add(createMarker("Alps Chalet Resort", 210, 220, "hotel"));
            destInfo.put("markers", markers);

            List<Map<String, Integer>> routes = new ArrayList<>();
            routes.add(createRoute(110, 100, 150, 160));
            routes.add(createRoute(150, 160, 210, 220));
            destInfo.put("routes", routes);

            itineraryText = "## Swiss Alps Winter Escapes (5 Days)\n\n" +
                    "### Day 1: Lucerne Arrival\n" +
                    "- **Morning:** Arrival in Lucerne. Board historic steamer boat across Lake Lucerne.\n" +
                    "- **Afternoon:** Historic Chapel Bridge photo walk.\n" +
                    "- **Evening:** Cozy cheese fondue dinner at Zunfthaus.\n\n" +
                    "### Day 2: Mount Pilatus Ascent\n" +
                    "- **Morning:** Ascend Mt Pilatus via the cogwheel railway.\n" +
                    "- **Afternoon:** Toboggan sledding and snowshoe trekking.\n" +
                    "- **Evening:** Stay in mountain top Hotel Pilatus-Kulm.";
        } else {
            // Default: Bali
            destInfo.put("name", "Ubud, Bali");
            destInfo.put("image", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80");
            destInfo.put("temp", "28°C");
            destInfo.put("weather", "Sunny");
            destInfo.put("crowdLevel", "Low");

            Map<String, Double> budget = new LinkedHashMap<>();
            budget.put("flights", 38000.0);
            budget.put("hotels", 42000.0);
            budget.put("daily", 20000.0);
            budget.put("total", 100000.0);
            destInfo.put("budget", budget);

            Map<String, Object> savings = new LinkedHashMap<>();
            savings.put("estimated", 100000);
            savings.put("savings", 28000);
            savings.put("cheaperFlights", true);
            savings.put("betterHotels", true);
            savings.put("restaurantDeals", true);
            destInfo.put("savings", savings);

            Map<String, Object> travelScore = new LinkedHashMap<>();
            travelScore.put("score", 97);
            travelScore.put("weather", 5);
            travelScore.put("budget", 5);
            travelScore.put("safety", 4);
            travelScore.put("crowdLevel", 5);
            travelScore.put("recommendation", "Highly Recommended");
            destInfo.put("travelScore", travelScore);

            List<Map<String, Object>> markers = new ArrayList<>();
            markers.add(createMarker("Ubud Monkey Forest", 100, 120, "attraction"));
            markers.add(createMarker("Tegallalang Rice Terrace", 130, 80, "attraction"));
            markers.add(createMarker("Maya Ubud Resort", 170, 140, "hotel"));
            destInfo.put("markers", markers);

            List<Map<String, Integer>> routes = new ArrayList<>();
            routes.add(createRoute(100, 120, 130, 80));
            routes.add(createRoute(130, 80, 170, 140));
            destInfo.put("routes", routes);

            itineraryText = "## Ubud Wellness & Culture Retreat (5 Days)\n\n" +
                    "### Day 1: Spiritual Ubud Arrival\n" +
                    "- **Morning:** Arrival in Bali, drive to Ubud villa.\n" +
                    "- **Afternoon:** Monkey Forest walk and local craft markets.\n" +
                    "- **Evening:** Traditional Balinese Crispy Duck dinner at Bebek Bengil.";
        }

        result.put("destination", destInfo);
        result.put("itinerary", itineraryText);

        return result;
    }

    private Map<String, Object> createMarker(String label, int x, int y, String type) {
        Map<String, Object> marker = new LinkedHashMap<>();
        marker.put("label", label);
        marker.put("x", x);
        marker.put("y", y);
        marker.put("type", type);
        return marker;
    }

    private Map<String, Integer> createRoute(int x1, int y1, int x2, int y2) {
        Map<String, Integer> route = new LinkedHashMap<>();
        route.put("x1", x1);
        route.put("y1", y1);
        route.put("x2", x2);
        route.put("y2", y2);
        return route;
    }
}
