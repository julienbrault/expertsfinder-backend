/**
 * Created by julienbrault on 15-03-24.
 */
var ELASTICSEARCH_URL = 'https://fhj4jfsc:sst6g4lixvozrjc1@oak-3047149.us-east-1.bonsai.io/';

var parse = require('csv-parse');
var fs = require('fs');

var input = fs.readFileSync('./universites-unifiées - concordiadatabase.csv');

function finiDeParser(err, output) {

    var outputObjets = [];

    for (var i = 0; i < output.length; i++) {


        var objetProf = {
            city: output[i][0],
            university:output[i][1],
            country:output[i][2],
            link:output[i][3],
            name:output[i][4],
            title:output[i][5],
            department:output[i][6],
            faculty:output[i][7],
            phone:output[i][8],
            email:output[i][9],
            picture: output[i][10],
            keywords:output[i][11],
                language:output[i][12],
            bio:output[i][13],
            articles:output[i][14]
        };


        outputObjets.push(objetProf);

    }

    console.log(outputObjets);

    var elasticsearch = require('elasticsearch');
    var client = new elasticsearch.Client({
        host: 'https://fhj4jfsc:sst6g4lixvozrjc1@oak-3047149.us-east-1.bonsai.io/',
        log: 'trace'
    });



    for (var i = 0; i < outputObjets.length; i++) {

        function finiInexer(error, response) {
            console.log(error);
            console.log(response);
        }

        client.index({
            index: 'profs',
            type: 'prof',
            id: outputObjets[i].email,
            body: outputObjets[i]
        }, finiInexer);
    }
}

parse(input, {delimiter: ','}, finiDeParser);


