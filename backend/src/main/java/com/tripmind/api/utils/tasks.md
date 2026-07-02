# Tasks - AI Travel Engine, Gemini & MapLibre Integration

## Phase 1: Gemini Client & AI Config
- `[ ]` Configure Spring WebClient / RestTemplate for Gemini in `GeminiConfig.java`
- `[ ]` Write `GeminiClientService.java` with prompt generation, error handling, rate limiting, and fallback responses
- `[ ]` Write `PromptTemplates.java` for itinerary generation, recommendations, budget optimization, and chat context

## Phase 2: AI Travel Engine & Itinerary Services
- `[ ]` Implement `AiTravelEngine.java` (analyzers for preference, season, weather, style, risk, packing)
- `[ ]` Implement `ItineraryGeneratorService.java` (generating day-by-day itineraries: Morning, Afternoon, Evening, Night)
- `[ ]` Add endpoints for modifying itineraries (Regenerate Day, Replace Activity, Optimize Route, Change Stays)

## Phase 3: External Provider Adapters & Background Tasks
- `[ ]` Implement Provider Adapter interfaces: FlightProvider, HotelProvider, WeatherProvider, CurrencyProvider
- `[ ]` Implement mock providers that implement the interfaces
- `[ ]` Enable Scheduling and implement `CacheSyncScheduler.java` for periodic Weather, Currency, and Stays updates

## Phase 4: Discover AI, Details, and Chat APIs
- `[ ]` Implement intelligent destination search (typo correction, ranking, semantic queries)
- `[ ]` Implement `/api/ai-chat` with history and trip context memory
- `[ ]` Implement `/api/intelligence/predict` for flight/hotel forecasts, visas, safety

## Phase 5: Frontend Zustand Stores, Loader States, MapLibre & AI Buttons
- `[ ]` Create frontend Zustand stores: `useAIStore`, `useConversationStore`, `useMapStore`, `useSearchStore`
- `[ ]` Connect interactive MapLibre map features (animated markers, 3D terrains, overlays for weather, budget, hidden gems)
- `[ ]` Connect all AI buttons and premium loader states (AI Thinking, Calculating Budget, Building Itinerary)

## Phase 6: Compilation & Verification
- `[ ]` Run Spring Boot compile check (`mvn clean compile`)
- `[ ]` Run Next.js build verification (`npm run build`)
- `[ ]` Create walkthrough document
