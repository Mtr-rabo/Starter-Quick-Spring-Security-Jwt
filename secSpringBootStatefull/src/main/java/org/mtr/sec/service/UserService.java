package org.mtr.sec.service;

import java.util.List;

import org.mtr.sec.dto.UserDTO;
import org.mtr.sec.entities.AppUser;
import org.mtr.sec.entities.Profile;
import org.mtr.sec.repo.ProfileRepository;
import org.mtr.sec.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUser createUser(UserDTO dto) {
        Profile profile = profileRepository.findById(dto.getProfileId())
            .orElseThrow(() -> new RuntimeException("Profile not found"));

        AppUser user = AppUser.builder()
            .username(dto.getUsername())
            .password(passwordEncoder.encode(dto.getPassword()))
            .email(dto.getEmail())
            .enabled(true)
            .profile(profile)
            .build();

        return userRepository.save(user);
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public AppUser updateUser(Long id, UserDTO dto) {
        AppUser user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setProfile(profileRepository.findById(dto.getProfileId())
            .orElseThrow(() -> new RuntimeException("Profile not found")));

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

	public AppUser getUserById(Long id) {

		return userRepository.findById(id).get();
	}
	public AppUser getUserByUsername(String name) {

		return userRepository.findByUsername(name).get();
	}
}
