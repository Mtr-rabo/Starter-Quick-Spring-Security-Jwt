package org.mtr.sec.web;



import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import org.mtr.sec.JwtService;
import org.mtr.sec.dto.AuthRequest;
import org.mtr.sec.dto.UserDTO;
import org.mtr.sec.entities.AppUser;
import org.mtr.sec.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private  final JwtService jwtService;
    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String username, 
                                    @RequestParam String password) {
		/*
		 * AppUser user = userservice.getUserByUsername(username); try { Authentication
		 * auth = authenticationManager.authenticate( new
		 * UsernamePasswordAuthenticationToken(username, password));
		 * 
		 * 
		 * Instant now = Instant.now(); String scope = auth.getAuthorities().stream()
		 * .map(GrantedAuthority::getAuthority) .collect(Collectors.joining(" "));
		 * 
		 * JwtClaimsSet claims = JwtClaimsSet.builder() // .issuer("your-issuer") //
		 * Ajoutez un issuer .issuedAt(now) .expiresAt(now.plus(10, ChronoUnit.MINUTES))
		 * .subject(auth.getName()) .claim("scope", scope)
		 * 
		 * .claim("userId", user.getId()) .claim("username", user.getUsername())
		 * .claim("email", user.getEmail()) .claim("enabled", user.isEnabled())
		 * .claim("profile", user.getProfile() != null ? user.getProfile().getName() :
		 * null) .claim("roles", user.getProfile().getRoles()) .build();
		 * 
		 * JwsHeader header = JwsHeader.with(MacAlgorithm.HS512).build(); String token =
		 * jwtEncoder.encode(JwtEncoderParameters.from(header, claims))
		 * .getTokenValue();
		 * 
		 * return Map.of("access-token", token); } catch (AuthenticationException e) {
		 * throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
		 * "Invalid credentials"); }
		 */
    	return jwtService.jwt(username, password);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate(); // Invalide la session manuellement
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public Authentication currentUser(Authentication authentication) {
   
        return authentication;
    }
}
