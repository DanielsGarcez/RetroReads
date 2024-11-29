package com.cruzeirodosul.RetroReads.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.cruzeirodosul.RetroReads.models.UserRetro;
import com.cruzeirodosul.RetroReads.repositories.UserRepository;

@Controller
public class LoginController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@GetMapping("/login")
	public String getLoginPage(Model model) {
		UserRetro user = new UserRetro();
		model.addAttribute("user",user);
		return "login";
	}
	
	@PostMapping("/register")
	public String register(@ModelAttribute UserRetro user) {
		if (user == null || user.getNome() == null || user.getEmail() == null) {
	        return "redirect:/login?error";    
	    }
		String password = passwordEncoder.encode(user.getPassword());
	    user.setPassword(password);
	    System.out.println("Usuario registrado: "+ user.getNome());
	    userRepository.save(user);
	    return "redirect:/login";
	}

}
