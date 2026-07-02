package com.tripmind.api.dtos;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherCacheDto {
    private LocalDate date;
    private double tempMax;
    private double tempMin;
    private String conditionText;
    private String code;
    private double humidity;
    private double windKph;
}
