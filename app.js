/**
 * Classifier de test
 * Ex : node app.js "bonjour"
 */

let bayes = require('bayes');
const fs = require('fs');

fs.readFile("./classifier.json", function (err, data) {

  let classifier = bayes.fromJson(data);
  let st1 = classifier.categorize(process.argv[2]);

  console.log(st1);

})

