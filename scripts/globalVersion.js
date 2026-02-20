fetch("https://api.github.com/repos/DanielsGarcez/RetroReads/commits")
  .then(res => res.json())
  .then(data => {
    const ultimoCommit = data[0];
    console.log("Versão:", ultimoCommit.sha.substring(0,7));
    console.log("Mensagem:", ultimoCommit.commit.message);
  })
  .catch(err => console.error("Erro ao buscar commit:", err));