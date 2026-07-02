package com.tripmind.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripmind.api.dtos.BookingDto;
import com.tripmind.api.security.JwtTokenProvider;
import com.tripmind.api.services.BookingService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import java.util.UUID;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookingController.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters to simplify API routing checks
public class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookingService bookingService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getUserBookings_Success() throws Exception {
        UUID userId = UUID.randomUUID();
        BookingDto booking = BookingDto.builder()
                .id(UUID.randomUUID())
                .userId(userId)
                .resourceType("HOTEL")
                .resourceName("Grand Hyatt Tokyo")
                .price(450.0)
                .status("CONFIRMED")
                .build();

        Mockito.when(bookingService.getBookingsByUserId(Mockito.any())).thenReturn(List.of(booking));

        mockMvc.perform(get("/api/bookings")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].resourceName").value("Grand Hyatt Tokyo"))
                .andExpect(jsonPath("$[0].status").value("CONFIRMED"));
    }

    @Test
    public void createBooking_Success() throws Exception {
        UUID userId = UUID.randomUUID();
        BookingDto request = BookingDto.builder()
                .resourceType("FLIGHT")
                .resourceName("JL-006")
                .price(1200.0)
                .build();

        BookingDto response = BookingDto.builder()
                .id(UUID.randomUUID())
                .userId(userId)
                .resourceType("FLIGHT")
                .resourceName("JL-006")
                .referenceNumber("TMAI-883719")
                .price(1200.0)
                .status("PENDING")
                .build();

        Mockito.when(bookingService.createBooking(Mockito.any(), Mockito.any())).thenReturn(response);

        mockMvc.perform(post("/api/bookings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.referenceNumber").value("TMAI-883719"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }
}
