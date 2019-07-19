/**
 * Entrainement du classifier depuis csv
 */

const bayes = require('bayes')
const fs = require('fs')
const csv = require("csvtojson");

let classifier = null;

// Lancement
loadClassifier();

// Chargement du classifier
function loadClassifier() {
    fs.readFile("./classifier.json", function (err, data) {

        if (err) throw err;

        if (data.length) {
            classifier = bayes.fromJson(data)
        } else {
            classifier = bayes()
        }

        readCsv();

    })
}

// Lecture de data.csv
function readCsv() {
    csv({
        delimiter: ','
    })
        .fromFile('data.csv')
        .then((jsonObj) => {

            console.log(jsonObj);

            // Parcours
            jsonObj.forEach(function (val) {
                classifier.learn(val.sentence, val.result);
            })

            writeFile();
        })
}

// Sauvegarde du classifier
function writeFile() {
    fs.writeFile('./classifier.json', classifier.toJson(), function (err) {
        if (err) {
            return console.log(err)
        }

        console.log("Classifier sauvegardé")
    });
}
