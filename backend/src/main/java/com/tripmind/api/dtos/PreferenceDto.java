package com.tripmind.api.dtos;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PreferenceDto {
    private List<String> travelerTypes;
    private String budgetCategory;
    private String pacePreference;
    private String groupType;
    private String duration;
}
