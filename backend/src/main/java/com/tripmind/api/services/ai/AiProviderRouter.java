package com.tripmind.api.services.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Smart AI provider router for Trip Mind AI.
 *
 * Priority chain:
 *   1. NVIDIA Nemotron Ultra (primary — most powerful, best JSON reasoning)
 *   2. Google Gemini Flash   (fallback — if NVIDIA quota exceeded or unavailable)
 *   3. Local mock response   (last resort — handled inside GeminiClientService)
 *
 * All existing services (AiService, AiChatController, AiTravelEngine) should
 * call this router instead of calling GeminiClientService directly.
 */
@Service
public class AiProviderRouter {

    private static final Logger logger = LoggerFactory.getLogger(AiProviderRouter.class);

    private final NvidiaClientService nvidiaClientService;
    private final GeminiClientService geminiClientService;

    public AiProviderRouter(NvidiaClientService nvidiaClientService,
                            GeminiClientService geminiClientService) {
        this.nvidiaClientService = nvidiaClientService;
        this.geminiClientService = geminiClientService;
    }

    /**
     * Routes the prompt through the AI provider chain.
     * Always returns a non-null string — either AI output or a local fallback.
     *
     * @param prompt The prompt to send to the AI model.
     * @return The AI-generated text response.
     */
    public String generateText(String prompt) {
        // --- Attempt 1: NVIDIA Nemotron Ultra ---
        if (nvidiaClientService.isConfigured()) {
            logger.info("[Router] Routing to NVIDIA Nemotron Ultra...");
            String nvidiaResponse = nvidiaClientService.generateText(prompt);
            if (nvidiaResponse != null && !nvidiaResponse.isBlank()) {
                logger.info("[Router] NVIDIA responded successfully.");
                return nvidiaResponse;
            }
            logger.warn("[Router] NVIDIA returned null/empty. Falling back to Gemini...");
        } else {
            logger.info("[Router] NVIDIA not configured. Using Gemini directly.");
        }

        // --- Attempt 2: Google Gemini Flash (includes its own local fallback) ---
        logger.info("[Router] Routing to Google Gemini...");
        return geminiClientService.generateText(prompt);
    }
}
