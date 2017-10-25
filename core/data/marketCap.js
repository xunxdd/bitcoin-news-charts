var rp = require('request-promise');
var osmosis = require('osmosis');
const cryptoHistorical = '';

function MarketCap() {
  function retrieveCurrentData() {
    rp('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(function(data) {
        console.log(data)
      })
      .catch(function(err) {});
  }

  function retriveHistoricalData(ticker) {
    ticker = ticker || 'bitcoin';
    var url = `https://coinmarketcap.com/currencies/${ticker}/historical-data/`
    var latest = null;
    return new Promise(function(resolve, reject) {
      return osmosis
        .get(url)
        .find('#historical-data')
        .set({
          'data': 'tbody > tr:first-child'
        })
        .data(function(listing) {
          var dataArray = listing.data.split("\n");
          if (dataArray.length !== 7) {
            throw ('oops, data error')
          }
          var data = {
            d: dataArray[0].trim(),
            o: dataArray[1].trim(),
            h: dataArray[2].trim(),
            l: dataArray[3].trim(),
            c: dataArray[4].trim(),
            v: dataArray[5].trim(),
            mc:  dataArray[6].trim()
          }
          latest = data;
        })
        .log(console.log)
        .error(console.log)
        .done(function() {
          return resolve(latest)
        })
    })
  }

  return {
    retrieveCurrentData: retrieveCurrentData,
    retriveHistoricalData: retriveHistoricalData
  }
}

module.exports = MarketCap;
