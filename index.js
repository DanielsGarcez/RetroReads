// Requisição do Express e Handlebars
const express = require("express")
const app = express()
const exphbs = require('express-handlebars')

// Configuração do Handlebars
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs',hbs.engine)
app.set('view engine', 'hbs')

// Servir arquivos estáricos (imagens e estilos)
app.use(express.static('public'))

// Rotas das páginas .hbs:

// home
app.get('/home', function(req, res){
    res.render('home', {title:'home'})
})
// catalogo
app.get('/catalogo', function(req, res){
    res.render('catalogo', {title:'catalogo'})
})
// foruns
app.get('/foruns', function(req, res){
    res.render('foruns', {title:'foruns'})
})
// precos
app.get('/precos', function(req, res){
    res.render('precos', {title:'precos'})
})




// Servidor Online
app.listen(8082, function(){
    console.log("Servidor Online 🤓👍")
})