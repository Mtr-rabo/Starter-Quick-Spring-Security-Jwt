package org.mtr.sec;

import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.crypto.spec.SecretKeySpec;

import org.mtr.sec.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import com.nimbusds.jose.jwk.source.ImmutableSecret;

import lombok.RequiredArgsConstructor;

@EnableMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsServiceImpl userDetailsService;
    @Value("${jwt.secretKey}")
    private String secretkey;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
        		.cors(Customizer.withDefaults()) 
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
              //  .requestMatchers("/api/auth/login/**").permitAll() // Autoriser l'accès sans authentification
               .requestMatchers("/api/auth/**","/swagger-ui/**","/swagger-ui.html","/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/actuator/**").permitAll()
            		.anyRequest().authenticated() // Toutes les autres requêtes nécessitent une authentification
            )
            .oauth2ResourceServer(oa -> oa.jwt(Customizer.withDefaults()))
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public JwtEncoder jwtEncoder() {
        // Assurez-vous que la clé est en UTF-8
        return new NimbusJwtEncoder(new ImmutableSecret<>(secretkey.getBytes(StandardCharsets.UTF_8)));
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // Utilisez la même conversion de clé que pour l'encodeur
        byte[] keyBytes = secretkey.getBytes(StandardCharsets.UTF_8);
        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "HmacSHA512");
        return NimbusJwtDecoder.withSecretKey(keySpec)
                              .macAlgorithm(MacAlgorithm.HS512)
                              .build();
    }
    @Bean
    public AuthenticationManager authManager(UserDetailsServiceImpl userDetailsService) throws Exception {
      DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
      authenticationProvider.setPasswordEncoder(passwordEncoder());
      authenticationProvider.setUserDetailsService(userDetailsService);
      return new ProviderManager(authenticationProvider);
    }
     	
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}