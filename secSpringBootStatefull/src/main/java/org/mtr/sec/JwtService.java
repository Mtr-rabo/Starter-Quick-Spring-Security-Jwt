package org.mtr.sec;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

import org.mtr.sec.entities.AppUser;
import org.mtr.sec.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {
	   private final AuthenticationManager authenticationManager;
	    private final JwtEncoder jwtEncoder;
	    private final UserService userservice;
	public Map<String, String> jwt( String username, 
         String password){
		AppUser user = userservice.getUserByUsername(username);
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
            
            
            Instant now = Instant.now();
            String scope = auth.getAuthorities().stream()
                             .map(GrantedAuthority::getAuthority)
                             .collect(Collectors.joining(" "));
            
            JwtClaimsSet claims = JwtClaimsSet.builder()
              //  .issuer("your-issuer") // Ajoutez un issuer
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.MINUTES))
                .subject(auth.getName())
                .claim("scope", scope)

                .claim("userId", user.getId())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("enabled", user.isEnabled())
                .claim("profile", user.getProfile() != null ? user.getProfile().getName() : null)
                .claim("roles", user.getProfile().getRoles())
                .build();

            JwsHeader header = JwsHeader.with(MacAlgorithm.HS512).build();
            String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims))
                                   .getTokenValue();
            
            return Map.of("access-token", token);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
		
	}

}
