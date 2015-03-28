var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'https://fhj4jfsc:sst6g4lixvozrjc1@oak-3047149.us-east-1.bonsai.io/',
    log: 'trace'
});



var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get('/',

    function (request, response) {
        response.send('Hello World!')
    }
);

app.get('/search',

    function (request, response) {

        client.search({
            index: 'profs',
            q: request.query.keyword
        }).then(
            function(resultat) {
                response.render('search', resultat);
            }
        )
    }
);

app.get('/profs/:prof_id:',

    function (request, response) {
        console.log(request);
        response.send('Page de prof');
    }
);

app.listen(process.env.PORT);









/////////



//var http = require('http');
//var server = http.createServer(

//function(request, response) {

// Ici nous sommes à l'intérieur de la fonction de callback.

// Ce code va s'exécuter pour chaque requête envoyée à notre serveur

// Durant chaque exécution, l'argument request correspond à la requête envoyée (par exemple

// quelle URL, quels paramêtres de formulaires si présents, ...)

// L'argument response nous permet d'envoyer une réponse à l'utilisateur. Ici nous n'utiliserons

// pas request car nous ne voulons pas se soucier des détails de la requête. Nous allons simplement

// envoyer une réponse générique à l'utilisateur:

//response.end('Votre serveur fonctionne!'); // cette ligne envoie la réponse pour la requête "courante"

//} // fin de la fonction de callback

//); // fin de l'appel à la fonction createServer

// Maintenant que nous avons créé le serveur, nous pouvons le faire écouter sur un certain "port"
// (comme un canal de télé) notre ordinateur peut écouter sur ~65000 ports à la fois et réagir à chacun séparément

//server.listen(3000); // écouter sur le port 3000

//Si nous exécutons notre serveur localement grâce à l'application node, ' +
//'nous pourrons aller à toutes les URL commencant par http://localhost:3000/ et dans tous
// les cas nous aurons la même réponse du serveur: un document texte qui contient la phrase "Votre serveur fonctionne!".







