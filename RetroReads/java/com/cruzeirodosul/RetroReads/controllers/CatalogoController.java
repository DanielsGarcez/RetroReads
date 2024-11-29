package com.cruzeirodosul.RetroReads.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cruzeirodosul.RetroReads.models.Livro;
import com.cruzeirodosul.RetroReads.repositories.LivroRepository;

@Controller
public class CatalogoController {
	
	@Autowired
	LivroRepository livroRepository;
	
	@GetMapping("/catalogo.html")
	public String getCatalogo(Model model) {
		List<Livro> livros = livroRepository.findAll();
		model.addAttribute("livros", livros);
		return "catalogo";
	}

}
