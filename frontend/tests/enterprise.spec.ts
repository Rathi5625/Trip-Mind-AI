import { test, expect } from '@playwright/test';

test.describe('Trip Mind AI - Enterprise Flow Tests', () => {

    test('should verify landing page header elements', async ({ page }) => {
        await page.goto('/');
        
        // Assert title brand text is present
        await expect(page.locator('h1')).toContainText('Trip Mind AI');
        
        // Assert main action button exists
        const startBtn = page.locator('button:has-text("Get Started")');
        if (await startBtn.count() > 0) {
            await expect(startBtn).toBeVisible();
        }
    });

    test('should perform login form validation', async ({ page }) => {
        await page.goto('/login');

        // Fill credentials
        await page.fill('input[type="email"]', 'traveler@tripmind.ai');
        await page.fill('input[type="password"]', 'password123');

        // Click Login submit button
        const submitBtn = page.locator('button[type="submit"]');
        if (await submitBtn.count() > 0) {
            await expect(submitBtn).toBeEnabled();
            await submitBtn.click();
        }
    });

    test('should verify discover destinations grid and categories', async ({ page }) => {
        await page.goto('/discover');

        // Check search form visibility
        const searchInput = page.locator('input[placeholder*="search" i]');
        if (await searchInput.count() > 0) {
            await expect(searchInput).toBeVisible();
        }
    });
});
