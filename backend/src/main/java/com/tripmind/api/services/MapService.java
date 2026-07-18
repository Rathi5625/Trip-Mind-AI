package com.tripmind.api.services;

import com.tripmind.api.entities.*;
import com.tripmind.api.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MapService {

    private static final Logger logger = LoggerFactory.getLogger(MapService.class);

    private final TripRepository tripRepository;
    private final DestinationRepository destinationRepository;
    private final HotelRepository hotelRepository;
    private final RestaurantRepository restaurantRepository;
    private final AttractionRepository attractionRepository;
    private final SavedPlaceRepository savedPlaceRepository;
    private final GeocodingService geocodingService;

    public MapService(
            TripRepository tripRepository,
            DestinationRepository destinationRepository,
            HotelRepository hotelRepository,
            RestaurantRepository restaurantRepository,
            AttractionRepository attractionRepository,
            SavedPlaceRepository savedPlaceRepository,
            GeocodingService geocodingService) {
        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
        this.hotelRepository = hotelRepository;
        this.restaurantRepository = restaurantRepository;
        this.attractionRepository = attractionRepository;
        this.savedPlaceRepository = savedPlaceRepository;
        this.geocodingService = geocodingService;
    }

    /**
     * Dynamic map layer details for a specific Destination ID.
     */
    @Transactional
    public Map<String, Object> getDestinationMapDetails(String destinationId) {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("destinationId", destinationId);

        Optional<Destination> destOpt = destinationRepository.findById(destinationId.toLowerCase());
        Destination dest = destOpt.orElse(null);

        String searchName = dest != null ? dest.getName() + ", " + dest.getCountry() : destinationId;
        double[] coords = ensureDestinationCoordinates(dest, searchName);

        Map<String, Double> center = new LinkedHashMap<>();
        center.put("lat", coords[0]);
        center.put("lng", coords[1]);

        details.put("center", center);
        details.put("zoom", 12);
        details.put("destinationName", dest != null ? dest.getName() : destinationId);
        details.put("country", dest != null ? dest.getCountry() : "");

        // Collect categorized markers
        List<Map<String, Object>> markers = new ArrayList<>();

        // 1. Center destination marker
        Map<String, Object> destMarker = new LinkedHashMap<>();
        destMarker.put("id", "dest-" + destinationId);
        destMarker.put("title", dest != null ? dest.getName() : destinationId);
        destMarker.put("category", "destination");
        destMarker.put("coordinates", center);
        destMarker.put("description", dest != null ? dest.getDescription() : "");
        markers.add(destMarker);

        // 2. Hotel markers
        if (dest != null) {
            List<Hotel> hotels = hotelRepository.findByDestinationId(dest.getId());
            for (Hotel h : hotels) {
                double[] hCoords = ensureHotelCoordinates(h, searchName);
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("id", "hotel-" + h.getId());
                m.put("title", h.getName());
                m.put("category", "hotel");
                Map<String, Double> c = new HashMap<>();
                c.put("lat", hCoords[0]);
                c.put("lng", hCoords[1]);
                m.put("coordinates", c);
                m.put("pricePerNight", h.getPricePerNight());
                m.put("rating", h.getRating());
                m.put("address", h.getAddress());
                markers.add(m);
            }

            // 3. Restaurant markers
            List<Restaurant> restaurants = restaurantRepository.findByDestinationId(dest.getId());
            for (Restaurant r : restaurants) {
                double[] rCoords = ensureRestaurantCoordinates(r, searchName);
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("id", "rest-" + r.getId());
                m.put("title", r.getName());
                m.put("category", "restaurant");
                Map<String, Double> c = new HashMap<>();
                c.put("lat", rCoords[0]);
                c.put("lng", rCoords[1]);
                m.put("coordinates", c);
                m.put("rating", r.getRating());
                m.put("cuisine", r.getCuisineType());
                m.put("address", r.getAddress());
                markers.add(m);
            }

            // 4. Attraction markers
            List<Attraction> attractions = attractionRepository.findByDestinationId(dest.getId());
            for (Attraction a : attractions) {
                double[] aCoords = ensureAttractionCoordinates(a, searchName);
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("id", "attr-" + a.getId());
                m.put("title", a.getName());
                m.put("category", "attraction");
                Map<String, Double> c = new HashMap<>();
                c.put("lat", aCoords[0]);
                c.put("lng", aCoords[1]);
                m.put("coordinates", c);
                m.put("rating", a.getRating());
                m.put("entryFee", a.getEntryFee());
                m.put("address", a.getAddress());
                markers.add(m);
            }
        }

        details.put("markers", markers);
        return details;
    }

    /**
     * Dynamic map payload for a complete Trip itinerary workspace.
     */
    @Transactional
    public Map<String, Object> getTripMapDetails(UUID tripId) {
        Map<String, Object> payload = new LinkedHashMap<>();
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found with ID: " + tripId));

        double[] tripCoords = ensureTripCoordinates(trip);

        Map<String, Double> center = new LinkedHashMap<>();
        center.put("lat", tripCoords[0]);
        center.put("lng", tripCoords[1]);

        payload.put("tripId", trip.getId().toString());
        payload.put("title", trip.getTitle());
        payload.put("destinationName", trip.getDestinationName());
        payload.put("center", center);
        payload.put("zoom", 12);

        List<Map<String, Object>> markers = new ArrayList<>();
        List<double[]> routeWaypoints = new ArrayList<>();

        double minLat = tripCoords[0];
        double maxLat = tripCoords[0];
        double minLng = tripCoords[1];
        double maxLng = tripCoords[1];

        // Add destination hub marker
        Map<String, Object> hubMarker = new LinkedHashMap<>();
        hubMarker.put("id", "hub-" + trip.getId());
        hubMarker.put("title", trip.getDestinationName() + " Hub");
        hubMarker.put("category", "destination");
        hubMarker.put("coordinates", center);
        markers.add(hubMarker);
        routeWaypoints.add(tripCoords);

        int activitySeq = 1;
        for (TripDay day : trip.getDays()) {
            for (Activity act : day.getActivities()) {
                double[] actCoords = ensureActivityCoordinates(act, trip.getDestinationName());
                if (actCoords != null) {
                    minLat = Math.min(minLat, actCoords[0]);
                    maxLat = Math.max(maxLat, actCoords[0]);
                    minLng = Math.min(minLng, actCoords[1]);
                    maxLng = Math.max(maxLng, actCoords[1]);

                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", "act-" + act.getId());
                    m.put("sequence", activitySeq++);
                    m.put("title", act.getName());
                    m.put("category", act.getCategory() != null ? act.getCategory().toLowerCase() : "activity");
                    m.put("dayNumber", day.getDayNumber());
                    m.put("time", act.getTime());
                    m.put("address", act.getAddress());
                    m.put("duration", act.getDuration());

                    Map<String, Double> c = new LinkedHashMap<>();
                    c.put("lat", actCoords[0]);
                    c.put("lng", actCoords[1]);
                    m.put("coordinates", c);

                    markers.add(m);
                    routeWaypoints.add(actCoords);
                }
            }
        }

        payload.put("markers", markers);
        payload.put("routeWaypoints", routeWaypoints);

        Map<String, double[]> bounds = new LinkedHashMap<>();
        bounds.put("southWest", new double[]{minLat, minLng});
        bounds.put("northEast", new double[]{maxLat, maxLng});
        payload.put("bounds", bounds);

        return payload;
    }

    /**
     * User trips location pins for interactive dashboard map.
     */
    @Transactional
    public List<Map<String, Object>> getUserTripsMapPins(User user) {
        List<Trip> trips;
        if (user != null) {
            trips = tripRepository.findByUserId(user.getId());
        } else {
            trips = tripRepository.findAll();
        }

        List<Map<String, Object>> pins = new ArrayList<>();
        for (Trip t : trips) {
            double[] coords = ensureTripCoordinates(t);
            Map<String, Object> pin = new LinkedHashMap<>();
            pin.put("tripId", t.getId().toString());
            pin.put("title", t.getTitle());
            pin.put("destinationName", t.getDestinationName());
            pin.put("startDate", t.getStartDate() != null ? t.getStartDate().toString() : "");
            pin.put("endDate", t.getEndDate() != null ? t.getEndDate().toString() : "");
            
            // Status determination
            String status = "planned";
            if (t.getEndDate() != null && t.getEndDate().isBefore(java.time.LocalDate.now())) {
                status = "visited";
            }
            pin.put("status", status);

            Map<String, Double> c = new LinkedHashMap<>();
            c.put("lat", coords[0]);
            c.put("lng", coords[1]);
            pin.put("coordinates", c);

            pins.add(pin);
        }
        return pins;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helper Methods with Automated Nominatim Geocoding & PostgreSQL Persistence
    // ─────────────────────────────────────────────────────────────────────────

    private double[] ensureDestinationCoordinates(Destination dest, String fallbackSearch) {
        if (dest != null && dest.getLatitude() != null && dest.getLongitude() != null) {
            return new double[]{dest.getLatitude(), dest.getLongitude()};
        }
        double[] resolved = geocodingService.geocodeQuery(fallbackSearch);
        if (resolved == null) {
            resolved = getCityFallback(fallbackSearch);
        }
        if (dest != null && resolved != null) {
            dest.setLatitude(resolved[0]);
            dest.setLongitude(resolved[1]);
            destinationRepository.save(dest);
        }
        return resolved;
    }

    private double[] ensureTripCoordinates(Trip trip) {
        if (trip.getLatitude() != null && trip.getLongitude() != null) {
            return new double[]{trip.getLatitude(), trip.getLongitude()};
        }
        double[] resolved = geocodingService.geocodeQuery(trip.getDestinationName());
        if (resolved == null) {
            resolved = getCityFallback(trip.getDestinationName());
        }
        trip.setLatitude(resolved[0]);
        trip.setLongitude(resolved[1]);
        tripRepository.save(trip);
        return resolved;
    }

    private double[] ensureActivityCoordinates(Activity act, String destinationName) {
        if (act.getLatitude() != null && act.getLongitude() != null) {
            return new double[]{act.getLatitude(), act.getLongitude()};
        }
        String searchQuery = (act.getAddress() != null && !act.getAddress().isEmpty())
                ? act.getAddress() + ", " + destinationName
                : act.getName() + ", " + destinationName;

        double[] resolved = geocodingService.geocodeQuery(searchQuery);
        if (resolved == null) {
            resolved = geocodingService.geocodeQuery(destinationName);
        }
        if (resolved == null) {
            resolved = getCityFallback(destinationName);
        }

        act.setLatitude(resolved[0]);
        act.setLongitude(resolved[1]);
        return resolved;
    }

    private double[] ensureHotelCoordinates(Hotel hotel, String destinationName) {
        if (hotel.getLatitude() != null && hotel.getLongitude() != null) {
            return new double[]{hotel.getLatitude(), hotel.getLongitude()};
        }
        String query = hotel.getName() + ", " + destinationName;
        double[] resolved = geocodingService.geocodeQuery(query);
        if (resolved == null) {
            resolved = geocodingService.geocodeQuery(destinationName);
        }
        if (resolved == null) {
            resolved = getCityFallback(destinationName);
        }
        hotel.setLatitude(resolved[0]);
        hotel.setLongitude(resolved[1]);
        hotelRepository.save(hotel);
        return resolved;
    }

    private double[] ensureRestaurantCoordinates(Restaurant restaurant, String destinationName) {
        if (restaurant.getLatitude() != null && restaurant.getLongitude() != null) {
            return new double[]{restaurant.getLatitude(), restaurant.getLongitude()};
        }
        String query = restaurant.getName() + ", " + destinationName;
        double[] resolved = geocodingService.geocodeQuery(query);
        if (resolved == null) {
            resolved = geocodingService.geocodeQuery(destinationName);
        }
        if (resolved == null) {
            resolved = getCityFallback(destinationName);
        }
        restaurant.setLatitude(resolved[0]);
        restaurant.setLongitude(resolved[1]);
        restaurantRepository.save(restaurant);
        return resolved;
    }

    private double[] ensureAttractionCoordinates(Attraction attraction, String destinationName) {
        if (attraction.getLatitude() != null && attraction.getLongitude() != null) {
            return new double[]{attraction.getLatitude(), attraction.getLongitude()};
        }
        String query = attraction.getName() + ", " + destinationName;
        double[] resolved = geocodingService.geocodeQuery(query);
        if (resolved == null) {
            resolved = geocodingService.geocodeQuery(destinationName);
        }
        if (resolved == null) {
            resolved = getCityFallback(destinationName);
        }
        attraction.setLatitude(resolved[0]);
        attraction.setLongitude(resolved[1]);
        attractionRepository.save(attraction);
        return resolved;
    }

    private double[] getCityFallback(String query) {
        if (query == null) return new double[]{48.8566, 2.3522};
        String q = query.toLowerCase();
        if (q.contains("tokyo") || q.contains("japan")) return new double[]{35.6895, 139.6917};
        if (q.contains("bali") || q.contains("indonesia")) return new double[]{-8.4095, 115.1889};
        if (q.contains("switzerland") || q.contains("swiss") || q.contains("zurich")) return new double[]{46.8182, 8.2275};
        if (q.contains("rome") || q.contains("italy")) return new double[]{41.9028, 12.4964};
        if (q.contains("new york") || q.contains("usa")) return new double[]{40.7128, -74.0060};
        if (q.contains("dubai") || q.contains("uae")) return new double[]{25.2048, 55.2708};
        if (q.contains("sydney") || q.contains("australia")) return new double[]{-33.8688, 151.2093};
        return new double[]{48.8566, 2.3522}; // Default Paris
    }
}
