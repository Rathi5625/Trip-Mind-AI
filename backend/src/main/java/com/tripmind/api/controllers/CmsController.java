package com.tripmind.api.controllers;

import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cms")
public class CmsController {

    private final List<CmsArticle> articles = new ArrayList<>(List.of(
            new CmsArticle(UUID.randomUUID(), "Hidden Gems in Bali", "Explore the secret waterfalls of North Bali...", "Bali, Indonesia", "Hidden Gems", true),
            new CmsArticle(UUID.randomUUID(), "Kyoto Autumn Travel Guide", "Best shrines and seasonal foliage views in Kyoto...", "Kyoto, Japan", "Guides", true)
    ));

    @GetMapping("/articles")
    public ResponseEntity<List<CmsArticle>> getArticles() {
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/articles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CmsArticle> createArticle(@RequestBody CmsArticle article) {
        article.setId(UUID.randomUUID());
        articles.add(article);
        return ResponseEntity.ok(article);
    }

    @DeleteMapping("/articles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteArticle(@PathVariable UUID id) {
        articles.removeIf(a -> a.getId().equals(id));
        return ResponseEntity.noContent().build();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CmsArticle {
        private UUID id;
        private String title;
        private String content;
        private String destination;
        private String category;
        private boolean isPublished;
    }
}
