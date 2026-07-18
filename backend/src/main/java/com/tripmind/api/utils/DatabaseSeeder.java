package com.tripmind.api.utils;

import com.tripmind.api.entities.*;
import com.tripmind.api.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DestinationRepository destinationRepository;
    private final HotelRepository hotelRepository;
    private final RestaurantRepository restaurantRepository;
    private final AttractionRepository attractionRepository;
    private final TripRepository tripRepository;
    private final ReviewRepository reviewRepository;
    private final NotificationRepository notificationRepository;
    private final WeatherCacheRepository weatherCacheRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, RoleRepository roleRepository,
                          DestinationRepository destinationRepository, HotelRepository hotelRepository,
                          RestaurantRepository restaurantRepository, AttractionRepository attractionRepository,
                          TripRepository tripRepository, ReviewRepository reviewRepository,
                          NotificationRepository notificationRepository, WeatherCacheRepository weatherCacheRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.destinationRepository = destinationRepository;
        this.hotelRepository = hotelRepository;
        this.restaurantRepository = restaurantRepository;
        this.attractionRepository = attractionRepository;
        this.tripRepository = tripRepository;
        this.reviewRepository = reviewRepository;
        this.notificationRepository = notificationRepository;
        this.weatherCacheRepository = weatherCacheRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() > 0) {
            logger.info("Database already seeded. Skipping seeder...");
            return;
        }

        logger.info("Starting Database Seeding Process...");

        // 1. Roles
        Role userRole = roleRepository.save(Role.builder().name(RoleName.ROLE_USER).build());
        Role adminRole = roleRepository.save(Role.builder().name(RoleName.ROLE_ADMIN).build());
        Role proRole = roleRepository.save(Role.builder().name(RoleName.ROLE_PRO).build());

        // 2. Users (100)
        List<User> users = new ArrayList<>();
        // Seed first user matching front end
        User alex = User.builder()
                .name("Alex Traveler")
                .email("traveler@tripmind.ai")
                .password(passwordEncoder.encode("password123"))
                .isVerified(true)
                .roles(new HashSet<>(Arrays.asList(userRole, proRole)))
                .build();
        users.add(userRepository.save(alex));

        for (int i = 2; i <= 100; i++) {
            User user = User.builder()
                    .name("Traveler " + i)
                    .email("user" + i + "@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .isVerified(true)
                    .roles(new HashSet<>(Collections.singletonList(userRole)))
                    .build();
            users.add(user);
        }
        userRepository.saveAll(users);
        logger.info("Seeded 100 Users.");

        // 3. Destinations (500)
        List<Destination> destinations = new ArrayList<>();
        String[] baseCities = {"Paris", "Tokyo", "Bali", "Rome", "Zurich", "New York", "Sydney", "Cairo", "London", "Barcelona",
                               "Kyoto", "Venice", "Dubai", "Reykjavik", "Singapore", "Seoul", "Bangkok", "Phuket", "Munich", "Cape Town"};
        String[] countries = {"France", "Japan", "Indonesia", "Italy", "Switzerland", "USA", "Australia", "Egypt", "UK", "Spain",
                              "Japan", "Italy", "UAE", "Iceland", "Singapore", "South Korea", "Thailand", "Thailand", "Germany", "South Africa"};
        String[] suffixes = {"Valley", "Beach", "Coast", "Highlands", "Island", "Ridge", "Bay", "Gardens", "Haven", "Plaza",
                             "Oasis", "Peak", "Harbor", "Falls", "Springs", "Park", "Canyon", "Village", "Plains", "Forest"};

        // Add distinct custom destinations first
        Destination tokyo = Destination.builder()
                .id("tokyo")
                .name("Tokyo")
                .country("Japan")
                .imageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80")
                .description("A high-tech megacity blended with shrines and sushi crawls.")
                .averageBudget("₹1.5L")
                .averageBudgetValue(150000)
                .bestSeason("March-May")
                .rating(4.8)
                .aiMatch(98)
                .categories(List.of("city-explorer", "food-enthusiast"))
                .weatherTemp("15°C–22°C")
                .weatherText("Sunny")
                .safetyIndex(92)
                .crowdScore(80)
                .latitude(35.6895)
                .longitude(139.6917)
                .build();
        destinations.add(destinationRepository.save(tokyo));

        Destination bali = Destination.builder()
                .id("bali")
                .name("Bali")
                .country("Indonesia")
                .imageUrl("https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80")
                .description("Tropical beaches, volcanic hiking, and spiritual retreats.")
                .averageBudget("₹70K")
                .averageBudgetValue(70000)
                .bestSeason("May-Sept")
                .rating(4.7)
                .aiMatch(97)
                .categories(List.of("beach-lover", "nature-traveler"))
                .weatherTemp("26°C–32°C")
                .weatherText("Sunny")
                .safetyIndex(82)
                .crowdScore(40)
                .latitude(-8.4095)
                .longitude(115.1889)
                .build();
        destinations.add(destinationRepository.save(bali));

        Destination switzerland = Destination.builder()
                .id("switzerland")
                .name("Swiss Alps")
                .country("Switzerland")
                .imageUrl("https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80")
                .description("Snow-capped peaks, scenic trains, and luxury ski chalets.")
                .averageBudget("₹2.5L")
                .averageBudgetValue(250000)
                .bestSeason("Dec-Feb")
                .rating(4.9)
                .aiMatch(95)
                .categories(List.of("adventure-seeker", "nature-traveler", "luxury-traveler"))
                .weatherTemp("8°C–14°C")
                .weatherText("Snowy")
                .safetyIndex(95)
                .crowdScore(30)
                .latitude(46.8182)
                .longitude(8.2275)
                .build();
        destinations.add(destinationRepository.save(switzerland));

        Destination paris = Destination.builder()
                .id("paris")
                .name("Paris")
                .country("France")
                .imageUrl("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80")
                .description("The global center of art, fashion, gastronomy, and culture.")
                .averageBudget("₹1.8L")
                .averageBudgetValue(180000)
                .bestSeason("June-August")
                .rating(4.8)
                .aiMatch(96)
                .categories(List.of("city-explorer", "luxury-traveler"))
                .weatherTemp("14°C–22°C")
                .weatherText("Partly Cloudy")
                .safetyIndex(85)
                .crowdScore(75)
                .latitude(48.8566)
                .longitude(2.3522)
                .build();
        destinations.add(destinationRepository.save(paris));

        int destIndex = 5;
        Random rand = new Random();

        while (destIndex <= 500) {
            int baseIdx = rand.nextInt(baseCities.length);
            String name = baseCities[baseIdx] + " " + suffixes[rand.nextInt(suffixes.length)];
            String id = name.toLowerCase().replace(" ", "-");
            
            // Check uniqueness
            if (destinations.stream().anyMatch(d -> d.getId().equals(id))) {
                continue;
            }

            Destination dest = Destination.builder()
                    .id(id)
                    .name(name)
                    .country(countries[baseIdx])
                    .imageUrl("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80")
                    .description("Explore the beautiful " + name + " in " + countries[baseIdx])
                    .averageBudget("₹" + (30 + rand.nextInt(200)) + "K")
                    .averageBudgetValue(30000 + rand.nextInt(200000))
                    .bestSeason("Year-Round")
                    .rating(4.0 + (rand.nextDouble() * 1.0))
                    .aiMatch(60 + rand.nextInt(38))
                    .categories(List.of("all"))
                    .weatherTemp("18°C–26°C")
                    .weatherText("Sunny")
                    .safetyIndex(70 + rand.nextInt(25))
                    .crowdScore(10 + rand.nextInt(85))
                    .build();

            destinations.add(dest);
            destIndex++;
        }
        destinationRepository.saveAll(destinations);
        logger.info("Seeded 500 Destinations.");

        // 4. Hotels (400)
        List<Hotel> hotels = new ArrayList<>();
        for (int i = 1; i <= 400; i++) {
            Destination dest = destinations.get(rand.nextInt(destinations.size()));
            Hotel hotel = Hotel.builder()
                    .destination(dest)
                    .name(dest.getName() + " Grand Hotel " + i)
                    .imageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80")
                    .pricePerNight(50 + rand.nextInt(450))
                    .rating(4.0 + (rand.nextDouble() * 1.0))
                    .address(i + " Luxury Way, " + dest.getName())
                    .stars(3 + rand.nextInt(3))
                    .description("Enjoy top premium hospitality in " + dest.getName())
                    .build();
            hotels.add(hotel);
        }
        hotelRepository.saveAll(hotels);
        logger.info("Seeded 400 Hotels.");

        // 5. Restaurants (600)
        List<Restaurant> restaurants = new ArrayList<>();
        String[] cuisines = {"Italian", "Japanese", "French", "Indian", "Chinese", "Local Fusion", "Seafood", "Steakhouse"};
        for (int i = 1; i <= 600; i++) {
            Destination dest = destinations.get(rand.nextInt(destinations.size()));
            Restaurant rest = Restaurant.builder()
                    .destination(dest)
                    .name(dest.getName() + " Bistro " + i)
                    .imageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80")
                    .priceLevel(1 + rand.nextInt(4))
                    .rating(4.0 + (rand.nextDouble() * 1.0))
                    .address(i + " Gourmet Blvd, " + dest.getName())
                    .cuisineType(cuisines[rand.nextInt(cuisines.length)])
                    .description("Delightful dining experience featuring authentic plates.")
                    .build();
            restaurants.add(rest);
        }
        restaurantRepository.saveAll(restaurants);
        logger.info("Seeded 600 Restaurants.");

        // 6. Attractions (700)
        List<Attraction> attractions = new ArrayList<>();
        String[] attrCats = {"Historic", "Nature", "Museum", "Theme Park", "Adventure", "Religious"};
        for (int i = 1; i <= 700; i++) {
            Destination dest = destinations.get(rand.nextInt(destinations.size()));
            Attraction attr = Attraction.builder()
                    .destination(dest)
                    .name("Attraction " + i + " in " + dest.getName())
                    .imageUrl("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80")
                    .entryFee(rand.nextInt(45))
                    .rating(4.0 + (rand.nextDouble() * 1.0))
                    .address(i + " Tourist Circle, " + dest.getName())
                    .category(attrCats[rand.nextInt(attrCats.length)])
                    .description("Must-visit landmark attraction in " + dest.getName())
                    .build();
            attractions.add(attr);
        }
        attractionRepository.saveAll(attractions);
        logger.info("Seeded 700 Attractions.");

        // 7. Trips (300)
        List<Trip> trips = new ArrayList<>();
        for (int i = 1; i <= 300; i++) {
            User user = users.get(rand.nextInt(users.size()));
            Destination dest = destinations.get(rand.nextInt(destinations.size()));
            Trip trip = Trip.builder()
                    .user(user)
                    .title("Trip to " + dest.getName())
                    .destinationName(dest.getName())
                    .startDate(LocalDate.now().plusDays(rand.nextInt(30)))
                    .endDate(LocalDate.now().plusDays(30 + rand.nextInt(10)))
                    .budgetCategory("comfort")
                    .travelersCount(1 + rand.nextInt(4))
                    .pace("balanced")
                    .build();
            trips.add(trip);
        }
        tripRepository.saveAll(trips);
        logger.info("Seeded 300 Trips.");

        // 8. Reviews (1000)
        List<Review> reviews = new ArrayList<>();
        for (int i = 1; i <= 1000; i++) {
            User user = users.get(rand.nextInt(users.size()));
            Destination dest = destinations.get(rand.nextInt(destinations.size()));
            Review review = Review.builder()
                    .user(user)
                    .destination(dest)
                    .rating(3.5 + (rand.nextDouble() * 1.5))
                    .comment("Amazing visit to " + dest.getName() + "! Highly recommended experience.")
                    .build();
            reviews.add(review);
        }
        reviewRepository.saveAll(reviews);
        logger.info("Seeded 1000 Reviews.");

        // 9. Notifications
        List<Notification> notifications = new ArrayList<>();
        notifications.add(Notification.builder()
                .user(alex)
                .title("Welcome to Trip Mind AI!")
                .message("Start creating personalized trips now.")
                .type("SUCCESS")
                .isRead(false)
                .build());
        notifications.add(Notification.builder()
                .user(alex)
                .title("Price Alert: Switzerland")
                .message("Stays in Switzerland are 15% cheaper this month.")
                .type("INFO")
                .isRead(false)
                .build());
        notificationRepository.saveAll(notifications);
        logger.info("Seeded Notifications.");

        // 10. Weather caches
        List<WeatherCache> weatherCaches = new ArrayList<>();
        for (Destination d : destinations) {
            weatherCaches.add(WeatherCache.builder()
                    .destination(d)
                    .date(LocalDate.now())
                    .tempMax(24.5)
                    .tempMin(18.2)
                    .conditionText("Sunny")
                    .code("sunny")
                    .humidity(65.0)
                    .windKph(12.5)
                    .build());
        }
        weatherCacheRepository.saveAll(weatherCaches);
        logger.info("Seeded Weather Caches.");

        logger.info("Database Seeding Completed Successfully!");
    }
}
