package com.tripmind.api.services;

import com.tripmind.api.dtos.PreferenceDto;
import com.tripmind.api.dtos.UserDto;
import com.tripmind.api.entities.Preference;
import com.tripmind.api.entities.User;
import com.tripmind.api.exceptions.ResourceNotFoundException;
import com.tripmind.api.repositories.PreferenceRepository;
import com.tripmind.api.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PreferenceRepository preferenceRepository;

    public UserService(UserRepository userRepository, PreferenceRepository preferenceRepository) {
        this.userRepository = userRepository;
        this.preferenceRepository = preferenceRepository;
    }

    public UserDto getUserProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToDto(user);
    }

    @Transactional
    public UserDto updateUserProfile(UUID userId, String name, String email) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setName(name);
        user.setEmail(email);
        User updatedUser = userRepository.save(user);

        return mapToDto(updatedUser);
    }

    public PreferenceDto getUserPreferences(UUID userId) {
        Preference preference = preferenceRepository.findByUserId(userId)
                .orElse(Preference.builder().build());

        return mapPreferenceToDto(preference);
    }

    @Transactional
    public PreferenceDto updateUserPreferences(UUID userId, PreferenceDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Preference preference = preferenceRepository.findByUserId(userId)
                .orElse(Preference.builder().user(user).build());

        preference.setTravelerTypes(dto.getTravelerTypes());
        preference.setBudgetCategory(dto.getBudgetCategory());
        preference.setPacePreference(dto.getPacePreference());
        preference.setGroupType(dto.getGroupType());
        preference.setDuration(dto.getDuration());

        Preference savedPref = preferenceRepository.save(preference);
        return mapPreferenceToDto(savedPref);
    }

    public UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .isVerified(user.isVerified())
                .roles(user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toSet()))
                .build();
    }

    private PreferenceDto mapPreferenceToDto(Preference p) {
        return PreferenceDto.builder()
                .travelerTypes(p.getTravelerTypes())
                .budgetCategory(p.getBudgetCategory())
                .pacePreference(p.getPacePreference())
                .groupType(p.getGroupType())
                .duration(p.getDuration())
                .build();
    }
}
