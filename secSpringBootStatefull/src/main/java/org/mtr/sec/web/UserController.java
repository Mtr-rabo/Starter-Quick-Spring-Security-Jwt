package org.mtr.sec.web;

import java.util.List;

import org.mtr.sec.dto.UserDTO;
import org.mtr.sec.entities.AppUser;
import org.mtr.sec.service.UserService;
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
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
  
    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public AppUser createUser(@RequestBody UserDTO dto) {
        return userService.createUser(dto);
    }

    @GetMapping
   // @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }
   
    @GetMapping("/{id}")
    public AppUser getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public AppUser updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
        return userService.updateUser(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
