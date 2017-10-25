const MarketCap = require('./data/marketCap')
const FirebaseManager = require('./FirebaseManager')
const coins = ['bitcoin', 'litecoin', 'ethereum']
var fbManager = new FirebaseManager();
var marketCap = new MarketCap();
var _ = require('lodash');

var promises = _.map(coins, function(coin) {
  return new Promise(function(resolve, reject) {
    return new MarketCap().retriveHistoricalData(coin).then(function (data) {
      fbManager.insertData(data, coin).then(function(){
        return resolve('done')
      }).catch(function() {
        return reject('oops');
      })
    }).catch(function(){
      return reject('oops');
    })
  })
});

Promise.all(promises).then(exit).catch(exit);

function exit() {
  console.log('exit')
  process.exit()
}
