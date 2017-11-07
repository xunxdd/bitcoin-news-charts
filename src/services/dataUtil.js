import FirebaseApp from './firebase.srv'
import _ from 'lodash'
const CoinMap = {
  'bitcoin': {
    Name: 'Bitcoin'
  },
  'ethereum': {
    Name: 'Ethereum'
  },
  'litecoin': {
    Name: 'Litecoin'
  }
}
export default {
  getCoinName(coin) {
    return CoinMap[coin].Name || '###$$';
  },

  getGoogleTrendData(coin, timespan) {
    let dataRef = FirebaseApp.database().ref('/trend/' + timespan + '/');
    let dataItems = []
    const ref = dataRef.child(coin);
    return new Promise(function (resolve, reject) {
      return ref.once('value').then((snapshot) => {
        let val = (snapshot.val());
        try {
          let results = JSON.parse(val);
          dataItems = _.get(results, 'default.timelineData', []);
          dataItems = _.map(dataItems, (item) => {
            return {
              'date': item.formattedTime,
              'value': item.value[0]
            }
          });
        } catch (ex) {
          console.log('oops', ex)
        }
        return resolve(dataItems);
      });
    });
  },

  getCoinData(coin, timespan) {
    let dataRef = FirebaseApp.database().ref('/data/' + timespan + '/');
    let dataItems = []
    const ref = dataRef.child(coin);
    return new Promise(function (resolve, reject) {
      return ref.once('value').then((snapshot) => {
        let val = (snapshot.val());
        try {
          dataItems = JSON.parse(val);
          dataItems = _.map(dataItems, (item) => {
            return {
              'Date': item.d,
              'Open': item.o,
              'High': item.h,
              'Low': item.l,
              'Close': item.c,
              'Volume': item.v,
              'Market Cap': item.mc
            }
          })
        } catch (ex) {
          console.log('oops', ex)
        }
        return resolve(dataItems);
      });
    });
  }
}
