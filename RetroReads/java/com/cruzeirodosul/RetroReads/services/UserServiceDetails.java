package com.cruzeirodosul.RetroReads.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cruzeirodosul.RetroReads.models.UserRetro;
import com.cruzeirodosul.RetroReads.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceDetails implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<UserRetro> user = userRepository.findByNome(username);

		if (user.isPresent()) {
			var userF = user.get();

			return User.builder().username(userF.getNome()).password(userF.getPassword()).build();
		} else {
			throw new UsernameNotFoundException(username);
		}

	}

}
