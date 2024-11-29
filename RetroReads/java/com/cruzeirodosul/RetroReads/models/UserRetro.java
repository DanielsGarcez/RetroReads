package com.cruzeirodosul.RetroReads.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_user")
public class UserRetro {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer plan;

	private String nome;

	private String endereco;
	private String email;
	private String CPF;
	private String password;

	@OneToMany(mappedBy = "owner")
	private List<Livro> livros = new ArrayList<>();

	
	public UserRetro() {

	}
	
	

	public UserRetro(Long id, Integer plan, String nome, String endereco, String email, String cPF, String password) {
		this.id = id;
		this.plan = plan;
		this.nome = nome;
		this.endereco = endereco;
		this.email = email;
		CPF = cPF;
		this.password = password;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getPlan() {
		return plan;
	}

	public void setPlan(Integer plan) {
		this.plan = plan;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCPF() {
		return CPF;
	}

	public void setCPF(String CPF) {
		this.CPF = CPF;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Livro> getLivros() {
		return livros;
	}


	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserRetro other = (UserRetro) obj;
		return Objects.equals(id, other.id);
	}

}
