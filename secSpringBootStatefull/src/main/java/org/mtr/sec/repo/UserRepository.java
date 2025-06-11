package org.mtr.sec.repo;

import java.util.Optional;

import org.mtr.sec.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}