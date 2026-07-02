package com.tripmind.api.dtos;

import lombok.*;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String email;
    private String name;
    private boolean isVerified;
    private Set<String> roles;
}
