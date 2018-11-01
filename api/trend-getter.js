const googleTrends = require('google-trends-api');

class TrendGetter {
  constructor(hl) {
    this.hl = hl || 'ja';
  }

  async interestOverYears(keywords, years) {
    let startTime = new Date();
    startTime.setFullYear(startTime.getFullYear() - years);
    const params = {
      keyword: keywords,
      startTime: startTime,
      granularTimeResolution: false,
      hl: this.hl
    };
    console.log("params are: ", params);
    const trendResponse = await googleTrends.interestOverTime(params);
    return JSON.parse(trendResponse);
  }
}

module.exports = TrendGetter;