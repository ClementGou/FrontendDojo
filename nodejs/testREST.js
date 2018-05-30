var request = require('../node_modules/request');
var express = require('../node_modules/express');
var app = express();

request('http://localhost:8080/BackendDojo/api/v1/member/2', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
  else {
    console.log("Error "+response.statusCode)
  }
})


app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hé ho, c\'est privé ici !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});

app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});


app.listen(8090);
