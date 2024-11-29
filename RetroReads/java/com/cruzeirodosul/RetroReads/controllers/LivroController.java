package com.cruzeirodosul.RetroReads.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.cruzeirodosul.RetroReads.models.Livro;
import com.cruzeirodosul.RetroReads.repositories.LivroRepository;

@Controller
public class LivroController {
	@Autowired
	LivroRepository livroRepository;
	
	@GetMapping("/detalheLivro/{id}")
	public String getLivroPage(@PathVariable Long id,Model model) {
		System.out.println("id: " + id);
		Livro l1 = livroRepository.findById(id).get();
		model.addAttribute("livro", l1);
		return "detalhesLivro";
	}
	
	@PostMapping("/comprar/{id}")
	public String comprarLivro(@PathVariable Long id) {
		Livro l1 = livroRepository.findById(id).get();
		l1.setName("reservado");
		livroRepository.deleteById(id);
		livroRepository.save(l1);
		
		return "redirect:/index.html";
	}

}
