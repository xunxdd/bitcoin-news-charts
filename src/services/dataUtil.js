import FirebaseApp from './firebase.srv'
import Vue from 'vue'
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
    return _.get(CoinMap, coin + '.Name', _.capitalize(coin.replace('-', ' ')));
  },

  getGoogleTrendData(coin, timespan, refname) {
    let dataRef = FirebaseApp.database().ref(`/${refname}/${timespan}/`);
    let dataItems = []
    const ref = dataRef.child(coin);
    return new Promise(function(resolve, reject) {
      return ref.once('value').then((snapshot) => {
        let val = (snapshot.val());
        try {
          let results = JSON.parse(val);
          dataItems = _.get(results, 'default.timelineData', []);
          dataItems = _.map(dataItems, (item) => {
            return {
              'date': item.formattedAxisTime,
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

  getRegionalInterestData(coin) {
    return this.getGoogleTrendRelatedData(coin, 'HistoricalAllTime', 'region-interest').then(function(data) {
      var geoMapData = _.get(data, 'default.geoMapData');
      return _.map(geoMapData, function(data) {
        return [data.geoName, data.value[0]];
      });
    })
  },

  getRelatedQueryData(coin) {
    return this.getGoogleTrendRelatedData(coin, 'HistoricalAllTime', 'related-queries').then(this.getRelatedKeywords.bind(this));
  },

  getRelatedTopicsData(coin) {
    return this.getGoogleTrendRelatedData(coin, 'HistoricalAllTime', 'related-topics').then(this.getRelatedKeywords.bind(this));
  },

  getRelatedKeywords(data) {
    var rankedList = _.get(data, 'default.rankedList', []);
    var keywords = [];
    if (rankedList.length > 0) {
      keywords = rankedList[0].rankedKeyword;
    }
    return keywords;
  },

  getGoogleTrendRelatedData(coin, timespan, refname) {
    timespan = timespan || 'HistoricalAllTime';
    refname = refname || 'region-interest';
    let dataRef = FirebaseApp.database().ref(`/${refname}/${timespan}/`);
    let results;
    const ref = dataRef.child(coin);
    return new Promise(function(resolve, reject) {
      return ref.once('value').then((snapshot) => {
        let val = (snapshot.val());
        try {
          results = JSON.parse(val);
        } catch (ex) {
          console.log('oops', ex)
        }
        return resolve(results);
      });
    });
  },

  getCoinData(coin, timespan) {
    let dataRef = FirebaseApp.database().ref('/data/' + timespan + '/');
    let dataItems = []
    const ref = dataRef.child(coin);
    return new Promise(function(resolve, reject) {
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
  },

  getMarketCapTicker() {
    let api = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
    let tickers = ['bitcoin', 'ethereum', 'litecoin'];
    let prices = {};
    return Vue.http.get(api).then(function(response) {
      let results = response.body;
      _.forEach(results, function(data) {
        if (_.includes(tickers, data.id)) {
          prices[data.id] = data;
        }
      });
      return prices;
    });
  },

  getChartDataTrendAndPrice(coin) {
    let p1 = this.getCoinData(coin, 'HistoricalAllTime');
    let p2 = this.getGoogleTrendData(coin, 'HistoricalAllTime', 'trend');
    const getDateSpan = this.getDateSpan;
    var promises = [p1, p2];
    return Promise.all(promises).then(function(results) {
      let chartData = results[0];
      let trendData = results[1]
      let dateSpan = getDateSpan(chartData);
      if (chartData.length > 0) {
        trendData = _.filter(trendData, (data) => {
          var trendDate = new Date(data.date);
          return trendDate >= new Date(dateSpan.startDate) && trendDate <= new Date(dateSpan.endDate);
        })
      }
      return {
        priceData: chartData,
        trendData: trendData,
        dataSpan: dateSpan
      }
    });
  },

  getDateSpan(data) {
    let len = data.length;
    return {
      startDate: data[len - 1].Date,
      endDate: data[0].Date
    }
  },

  getTimeLineData() {
    let dataRef = FirebaseApp.database().ref('/timeline');
    return new Promise(function(resolve, reject) {
      return dataRef.once('value').then((snapshot) => {
        return resolve(snapshot.val());
      })
    });
  }
}
