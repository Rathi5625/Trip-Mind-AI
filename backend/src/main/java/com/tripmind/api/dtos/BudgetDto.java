package com.tripmind.api.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetDto {
    private Long id;
    private double totalLimit;
    private double spentAmount;
    private String category;
}
