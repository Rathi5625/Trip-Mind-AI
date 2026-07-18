package com.tripmind.api.controllers;

import com.tripmind.api.services.PlannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {

    private final PlannerService plannerService;

    public PlannerController(PlannerService plannerService) {
        this.plannerService = plannerService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateTripPlan(@RequestBody Map<String, String> request) {
        Map<String, Object> result = plannerService.generateTripPlan(request);
        return ResponseEntity.ok(result);
    }
}
