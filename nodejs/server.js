var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

jeu.on('gameover', function (message, text, chiffre) {
  console.log(message, text, chiffre);

})

jeu.emit('gameover', 'loser', 'numero',56);



var server = http.createServer(function (req, res) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);
  res.writeHead(200, {"Content-Type": "text/plain"});
  if (page == '/text/' && 'prenom' in params && 'nom' in params) {
    res.write('votre prénom: ' + params['prenom'] + ' et votre nom: ' + params['nom'])
  } else {
    res.write('faut un nom et prénom')
  }
  res.end();
});

server.on('close', function () { // On écoute l'évènement close
  console.log('Serveur closed!')
});

server.listen(8090); //Démarrer le serveur

server.close(); //Arrête le serveur. Déclenche l'évènement close

