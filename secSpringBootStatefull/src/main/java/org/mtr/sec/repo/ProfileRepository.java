package org.mtr.sec.repo;

import java.util.Optional;

import org.mtr.sec.entities.Profile;
import org.mtr.sec.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Optional<Profile> findByName(String name);
	
}