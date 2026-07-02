package com.tripmind.api.services;

import com.tripmind.api.dtos.PaymentDto;
import com.tripmind.api.entities.Booking;
import com.tripmind.api.entities.Payment;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.BookingRepository;
import com.tripmind.api.repositories.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    public PaymentService(PaymentRepository paymentRepository, BookingRepository bookingRepository, BookingService bookingService) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    public List<PaymentDto> getPaymentsByUserId(UUID userId) {
        return paymentRepository.findByBookingUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public PaymentDto processCheckout(UUID bookingId, String gateway) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Simulate Gateway Transactions
        String txRef = gateway.toUpperCase() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String invoiceUrl = "https://tripmind.ai/receipts/invoice-" + txRef;
        String receiptUrl = "https://tripmind.ai/receipts/receipt-" + txRef;

        Payment payment = Payment.builder()
                .booking(booking)
                .amount(booking.getPrice())
                .currency("INR")
                .gateway(gateway)
                .status("COMPLETED")
                .transactionReference(txRef)
                .invoiceUrl(invoiceUrl)
                .receiptUrl(receiptUrl)
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        // Confirm the booking automatically on successful payment
        bookingService.confirmBooking(bookingId);

        return mapToDto(savedPayment);
    }

    @Transactional
    public PaymentDto refundPayment(UUID paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found"));
        payment.setStatus("REFUNDED");

        // Cancel the booking on refund
        bookingService.cancelBooking(payment.getBooking().getId());

        Payment savedPayment = paymentRepository.save(payment);
        return mapToDto(savedPayment);
    }

    public PaymentDto mapToDto(Payment p) {
        return PaymentDto.builder()
                .id(p.getId())
                .bookingId(p.getBooking().getId())
                .amount(p.getAmount())
                .currency(p.getCurrency())
                .gateway(p.getGateway())
                .status(p.getStatus())
                .transactionReference(p.getTransactionReference())
                .invoiceUrl(p.getInvoiceUrl())
                .receiptUrl(p.getReceiptUrl())
                .createdAt(p.getCreatedAt())
                .build();
    }
}
