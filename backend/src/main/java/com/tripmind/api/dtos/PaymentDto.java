package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {
    private UUID id;
    private UUID bookingId;
    private double amount;
    private String currency;
    private String gateway;
    private String status;
    private String transactionReference;
    private String invoiceUrl;
    private String receiptUrl;
    private LocalDateTime createdAt;
}
