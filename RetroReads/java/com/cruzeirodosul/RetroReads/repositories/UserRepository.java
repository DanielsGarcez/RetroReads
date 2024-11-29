package com.cruzeirodosul.RetroReads.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cruzeirodosul.RetroReads.models.UserRetro;

@Repository
public interface UserRepository extends JpaRepository<UserRetro, Long> {
	Optional<UserRetro> findByNome(String nome);

}
