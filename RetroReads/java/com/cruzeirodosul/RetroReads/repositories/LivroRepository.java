package com.cruzeirodosul.RetroReads.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cruzeirodosul.RetroReads.models.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

}
