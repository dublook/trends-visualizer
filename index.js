const googleTrends = require('google-trends-api');
const csvtojson = require('csvtojson');

function main() {
  let csvFileName = "sample.csv";
  const csvFilePath = './' + csvFileName;
  const startTime = new Date(2018, 9, 10, 0, 0, 0, 0);

  csvtojson().fromFile(csvFilePath)
    .then((jsonObj) => {
      for (const i in jsonObj) {
        const word = jsonObj[i]['文字列（名詞）'];
        googleTrends.interestOverTime({
          keyword: word,
          startTime: startTime
        })
          .then(function (results) {
            createGraph(results);
          })
          .catch(function (err) {
            console.error('Oh no there was an error', err);
          });
      }
    });
}

const createGraph = function (trendsObj) {
  console.log('These results are awesome', trendsObj);
}

main();
