package com.cruzeirodosul.RetroReads.models;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_livro")
public class Livro {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private Integer year;
	private String idioma;
	private String country;
	private Integer paginas;
	private String capa;
	@Column(length = 5000)
	private String description;
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private UserRetro owner;
	private String author;
	private String Categoria;
	private Float preco;
	private Integer quant;
	private String editora;
	private String dimensao;

	public Livro() {
	}

	public Livro(Long id, String name, Integer year, String idioma, String country, Integer paginas, String capa,
			String description, UserRetro owner, String author, String categoria, Float preco, String editora,
			String dimensao) {
		this.id = id;
		this.name = name;
		this.year = year;
		this.idioma = idioma;
		this.country = country;
		this.paginas = paginas;
		this.capa = capa;
		this.description = description;
		this.owner = owner;
		this.author = author;
		Categoria = categoria;
		this.preco = preco;
		this.editora = editora;
		this.dimensao = dimensao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		if (name.length() >= 23) {
			String retorno = name.substring(0, 23);
			return retorno + "...";
		} else {
			return name;
			
		}

	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getIdioma() {
		return idioma;
	}

	public void setIdioma(String idioma) {
		this.idioma = idioma;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getPaginas() {
		return paginas;
	}

	public void setPaginas(Integer paginas) {
		this.paginas = paginas;
	}

	public String getCapa() {
		return capa;
	}

	public void setCapa(String capa) {
		this.capa = capa;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public UserRetro getOwner() {
		return owner;
	}

	public void setOwner(UserRetro owner) {
		this.owner = owner;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategoria() {
		return Categoria;
	}

	public void setCategoria(String categoria) {
		Categoria = categoria;
	}

	public Float getPreco() {
		return preco;
	}

	public void setPreco(Float preco) {
		this.preco = preco;
	}

	public String getImageName() {
		String name = this.name;
		name = name.toLowerCase();
		name = name.replaceAll(" ", "-");

		return name + ".jpg";
	}

	public Integer getQuant() {
		return quant;
	}

	public void setQuant(Integer quant) {
		this.quant = quant;
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
		Livro other = (Livro) obj;
		return Objects.equals(id, other.id);
	}

}
