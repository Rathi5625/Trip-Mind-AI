package com.tripmind.api.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelerDto {
    private Long id;
    private String name;
    private String type;
    private int age;
}
