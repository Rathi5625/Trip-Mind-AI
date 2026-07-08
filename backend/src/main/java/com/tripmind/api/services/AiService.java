package com.tripmind.api.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripmind.api.entities.Trip;
import com.tripmind.api.entities.TripDay;
import com.tripmind.api.entities.Transportation;
import com.tripmind.api.services.ai.AiProviderRouter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class AiService {

    private static final Logger logger = LoggerFactory.getLogger(AiService.class);
    private final AiProviderRouter aiProviderRouter;
    private final ObjectMapper objectMapper;

    public AiService(AiProviderRouter aiProviderRouter, ObjectMapper objectMapper) {
        this.aiProviderRouter = aiProviderRouter;
        this.objectMapper = objectMapper;
    }

    @SuppressWarnings("unchecked")
    public List<TripDay> generateMockItinerary(Trip trip) {
        long durationDays = ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate()) + 1;
        String prompt = String.format(
                "Act as a professional AI travel planner. Create a detailed day-by-day itinerary for %s.\n" +
                        "Trip Details:\n" +
                        "- Duration: %d days\n" +
                        "- Start Date: %s\n" +
                        "- Budget Category: %s\n" +
                        "- Travelers Count: %d\n" +
                        "- Pace: %s\n\n" +
                        "You MUST respond ONLY with a raw JSON array matching this structure. Do not include markdown codeblocks like ```json or any other text. Here is the JSON schema:\n"
                        +
                        "[\n" +
                        "  {\n" +
                        "    \"dayNumber\": 1,\n" +
                        "    \"description\": \"Day description highlighting what to do.\",\n" +
                        "    \"transportations\": [\n" +
                        "      {\n" +
                        "        \"type\": \"WALK or TAXI or BUS or TRAIN or FLIGHT\",\n" +
                        "        \"origin\": \"Starting point/Hotel\",\n" +
                        "        \"destination\": \"Sightseeing attraction name\",\n" +
                        "        \"departureTime\": \"HH:MM AM/PM\",\n" +
                        "        \"arrivalTime\": \"HH:MM AM/PM\",\n" +
                        "        \"cost\": 15.0,\n" +
                        "        \"duration\": \"30m or 1h\"\n" +
                        "      }\n" +
                        "    ]\n" +
                        "  }\n" +
                        "]",
                trip.getDestinationName(), durationDays, trip.getStartDate(), trip.getBudgetCategory(),
                trip.getTravelersCount(), trip.getPace());

        try {
            String rawOutput = aiProviderRouter.generateText(prompt);

            // Clean markdown wrappers if returned
            String cleanJson = rawOutput.trim();
            if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.substring(cleanJson.indexOf("\n") + 1);
            }
            if (cleanJson.endsWith("```")) {
                cleanJson = cleanJson.substring(0, cleanJson.lastIndexOf("```"));
            }
            cleanJson = cleanJson.trim();

            List<Map<String, Object>> daysList = objectMapper.readValue(cleanJson,
                    new TypeReference<List<Map<String, Object>>>() {
                    });
            List<TripDay> days = new ArrayList<>();
            LocalDate currentDate = trip.getStartDate();

            for (Map<String, Object> dayMap : daysList) {
                int dayNum = ((Number) dayMap.get("dayNumber")).intValue();
                String desc = (String) dayMap.get("description");

                TripDay day = TripDay.builder()
                        .trip(trip)
                        .dayNumber(dayNum)
                        .date(currentDate)
                        .description(desc)
                        .build();

                List<Transportation> transportations = new ArrayList<>();
                List<Map<String, Object>> transList = (List<Map<String, Object>>) dayMap.get("transportations");
                if (transList != null) {
                    for (Map<String, Object> transMap : transList) {
                        Number costNum = (Number) transMap.get("cost");
                        double costVal = costNum != null ? costNum.doubleValue() : 0.0;

                        transportations.add(Transportation.builder()
                                .tripDay(day)
                                .type((String) transMap.get("type"))
                                .origin((String) transMap.get("origin"))
                                .destination((String) transMap.get("destination"))
                                .departureTime((String) transMap.get("departureTime"))
                                .arrivalTime((String) transMap.get("arrivalTime"))
                                .cost(costVal)
                                .duration((String) transMap.get("duration"))
                                .build());
                    }
                }
                day.setTransportations(transportations);
                days.add(day);
                currentDate = currentDate.plusDays(1);
            }
            return days;

        } catch (Exception e) {
            logger.warn("Failed to generate AI itinerary, falling back to mock: {}", e.getMessage());
        }

        return getLocalFallbackItinerary(trip);
    }

    private List<TripDay> getLocalFallbackItinerary(Trip trip) {
        List<TripDay> days = new ArrayList<>();
        LocalDate currentDate = trip.getStartDate();
        int dayNum = 1;

        while (!currentDate.isAfter(trip.getEndDate())) {
            TripDay day = TripDay.builder()
                    .trip(trip)
                    .dayNumber(dayNum)
                    .date(currentDate)
                    .description("Explore the highlights of " + trip.getDestinationName() + " - Day " + dayNum)
                    .build();

            List<Transportation> transportations = new ArrayList<>();
            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("WALK")
                    .origin("Hotel")
                    .destination("Morning Sightseeing Spot")
                    .departureTime("09:00 AM")
                    .arrivalTime("09:30 AM")
                    .cost(0.0)
                    .duration("30m")
                    .build());

            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("TAXI")
                    .origin("Sightseeing Spot")
                    .destination("Popular Local Restaurant")
                    .departureTime("12:30 PM")
                    .arrivalTime("01:00 PM")
                    .cost(15.0)
                    .duration("30m")
                    .build());

            transportations.add(Transportation.builder()
                    .tripDay(day)
                    .type("TRAIN")
                    .origin("Restaurant")
                    .destination("Evening Sunset Viewpoint")
                    .departureTime("04:30 PM")
                    .arrivalTime("05:00 PM")
                    .cost(3.50)
                    .duration("30m")
                    .build());

            day.setTransportations(transportations);
            days.add(day);

            currentDate = currentDate.plusDays(1);
            dayNum++;
        }

        return days;
    }
}
