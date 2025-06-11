package org.mtr.sec.web;


import java.util.List;

import org.mtr.sec.dto.ProfileDTO;

import org.mtr.sec.entities.Profile;
import org.mtr.sec.service.ProfileService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {
	
    private final ProfileService profileService;
    
    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Profile createProfile(@RequestBody ProfileDTO dto) {
        return profileService.createProfile(dto);
    }

    @GetMapping
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfile();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Profile updateProfile(@PathVariable Long id, @RequestBody ProfileDTO dto) {
        return profileService.updateProfile(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public void deleteProfile(@PathVariable Long id) {
    	profileService.deleteProfile(id);
    }
}
