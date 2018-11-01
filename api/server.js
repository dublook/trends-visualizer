const googleTrends = require('google-trends-api');
const csvtojson = require('csvtojson');
const express = require("express");
const app = express();

function main() {
  let csvFileName = "sample.csv";
  const csvFilePath = './' + csvFileName;

  csvtojson().fromFile(csvFilePath)
    .then((jsonObj) => {
      for (const i in jsonObj) {
        const word = jsonObj[i]['文字列（名詞）'];
      }
    });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/trend/:word", (req, res) => {
  let startTime = new Date();
  startTime.setFullYear(startTime.getFullYear() - 4);
  const word = req.params.word;
  const params = {
    keyword: word,
    startTime: startTime
  };
  console.log("params are: ", params);
  googleTrends.interestOverTime(params)
    .then(function (results) {
      const responseObj = JSON.parse(results);
      const defaultResponse = responseObj["default"];
      res.json(defaultResponse);
    })
    .catch(function (err) {
      console.error('Oh no there was an error', err);
      res.json(err);
    });
})

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
})
