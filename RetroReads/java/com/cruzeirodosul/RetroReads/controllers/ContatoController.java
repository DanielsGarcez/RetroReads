package com.cruzeirodosul.RetroReads.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContatoController {
	
	@GetMapping("/contato.html")
	public String getContatoPAge() {
		return "contato";
	}

}