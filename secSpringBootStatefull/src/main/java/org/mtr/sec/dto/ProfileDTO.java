package org.mtr.sec.dto;

import java.util.HashSet;
import java.util.Set;

import org.mtr.sec.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
	    private String name;
	    private Set<Role> roles = new HashSet<>();

}
