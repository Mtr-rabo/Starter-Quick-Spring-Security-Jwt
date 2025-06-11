package org.mtr.sec.service;


import java.util.List;

import org.mtr.sec.dto.ProfileDTO;

import org.mtr.sec.entities.Profile;
import org.mtr.sec.repo.ProfileRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {
	 private final ProfileRepository profileRepository;
	 
	 public Profile createProfile(ProfileDTO dto) {
		 
	    
	        Profile profile = Profile.builder()
	            .name(dto.getName())
	            .roles(dto.getRoles())
	            .build();

	        return profileRepository.save(profile);
	    }

	    public List<Profile> getAllProfile() {
	        return profileRepository.findAll();
	    }

	    public Profile updateProfile(Long id, ProfileDTO dto) {
	    	Profile profile = profileRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("profile not found"));

	        profile.setName(dto.getName());
	        profile.setRoles(dto.getRoles());
	        

	        return profileRepository.save(profile);
	    }

	    public void deleteProfile(Long id) {
	        profileRepository.deleteById(id);
	    }
}
