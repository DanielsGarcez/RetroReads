// Requisição do Express e Handlebars
const express = require("express")
const app = express()
const exphbs = require('express-handlebars')

// Configuração do Handlebars
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + 'views/partials'
})
app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')

// Servir arquivos estáricos (imagens e estilos)
app.use(express.static('public'))

// Rotas das páginas .hbs
app.get('/', function(req, res){
    res.render('home')
})





// Servidor Online
app.listen(8082, function(){
    console.log("Servidor Online 🤓👍")
})