package com.tripmind.api.controllers;

import com.tripmind.api.dtos.PaymentDto;
import com.tripmind.api.security.UserPrincipal;
import com.tripmind.api.services.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentDto>> getUserPayments(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<PaymentDto> response = paymentService.getPaymentsByUserId(userPrincipal.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<PaymentDto> processCheckout(
            @RequestParam("bookingId") UUID bookingId,
            @RequestParam("gateway") String gateway) {
        PaymentDto response = paymentService.processCheckout(bookingId, gateway);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<PaymentDto> refundPayment(@PathVariable UUID id) {
        PaymentDto response = paymentService.refundPayment(id);
        return ResponseEntity.ok(response);
    }
}
