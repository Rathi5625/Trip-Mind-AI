package com.tripmind.api.controllers;

import com.tripmind.api.dtos.PaymentDto;
import com.tripmind.api.security.JwtTokenProvider;
import com.tripmind.api.services.PaymentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.UUID;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PaymentController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentService paymentService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    public void processCheckout_Success() throws Exception {
        UUID bookingId = UUID.randomUUID();
        PaymentDto paymentResponse = PaymentDto.builder()
                .id(UUID.randomUUID())
                .bookingId(bookingId)
                .amount(450.0)
                .gateway("STRIPE")
                .status("COMPLETED")
                .transactionReference("STRIPE-XYZ8837")
                .build();

        Mockito.when(paymentService.processCheckout(Mockito.any(), Mockito.any())).thenReturn(paymentResponse);

        mockMvc.perform(post("/api/payments/checkout")
                .param("bookingId", bookingId.toString())
                .param("gateway", "STRIPE")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.gateway").value("STRIPE"))
                .andExpect(jsonPath("$.status").value("COMPLETED"))
                .andExpect(jsonPath("$.transactionReference").value("STRIPE-XYZ8837"));
    }
}
