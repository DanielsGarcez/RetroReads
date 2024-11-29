package com.cruzeirodosul.RetroReads.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cruzeirodosul.RetroReads.models.Livro;
import com.cruzeirodosul.RetroReads.repositories.LivroRepository;

@Controller
public class HomeController {

	@Autowired
	LivroRepository livroRepository;

	@GetMapping("/")
	public String getIndexPage(Model model) {
		
		List<Livro> livros1 = livroRepository.findAll();
		
		List<Livro> livros = new ArrayList<>();
		for (int i = 0; i < 4; i++) {
			livros.add(livros1.get(i));
		}
		
		model.addAttribute("livros", livros);
		return "index.html";
	}

	@GetMapping("/index.html")
	public String getIndexPage2(Model model) {
		List<Livro> livros1 = livroRepository.findAll();
		
		List<Livro> livros = new ArrayList<>();
		for (int i = 0; i < 4; i++) {
			livros.add(livros1.get(i));
		}
		
		model.addAttribute("livros", livros);
		return "index.html";
	}

}
