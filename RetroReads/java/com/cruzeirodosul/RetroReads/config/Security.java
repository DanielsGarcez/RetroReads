package com.cruzeirodosul.RetroReads.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.cruzeirodosul.RetroReads.services.UserServiceDetails;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class Security {
	@Autowired
	private UserServiceDetails userDetails;
	
	@Bean
	public UserDetailsService userDetailsService() {
		return userDetails;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetails);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.headers(headers -> headers.frameOptions().sameOrigin());
		http.csrf(AbstractHttpConfigurer::disable)
		.formLogin(login -> {
			login.loginPage("/login").permitAll();
			login.defaultSuccessUrl("/");
			login.failureForwardUrl("/404");
		}).authorizeHttpRequests(auth -> {

			auth.requestMatchers("/", "/login", "/CSS/**", "/Img/**", "/node_modules/**", "/nodeJS/**","/register","/catalogo.html").permitAll();
			auth.anyRequest().authenticated();
		});
		

		return http.build();
	}

}
