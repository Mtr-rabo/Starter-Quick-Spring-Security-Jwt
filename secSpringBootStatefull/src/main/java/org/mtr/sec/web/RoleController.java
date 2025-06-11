package org.mtr.sec.web;

import java.util.List;

import org.mtr.sec.dto.RoleDTO;

import org.mtr.sec.entities.Role;
import org.mtr.sec.service.RoleService;

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
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public Role createUser(@RequestBody RoleDTO dto) {
        return roleService.createRole(dto);
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @PutMapping("/{id}")
    public Role updateRole(@PathVariable Long id, @RequestBody RoleDTO dto) {
        return roleService.updateRole(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
    }
}
