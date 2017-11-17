<template>
<v-layout row wrap>
  <v-flex xs10>
    <indicators-chart :series="series" :coin="coinName"></indicators-chart>
  </v-flex>
</v-layout>
</template>

<script>
import IndicatorsChart from './highchart/IndicatorsChart'
import DataUtil from '../services/DataUtil'
import _ from 'lodash'

export default {
  name: 'OhlcChart',
  components: {
    IndicatorsChart
  },
  props: {
    coin: String
  },
  watch: {
    '$route': 'fetchData'
  },
  data() {
    return {
      coinName: this.coin,
      series: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let coin = this.coin || 'bitcoin';
      this.coinName = DataUtil.getCoinName(coin);
      console.log(this.coinName)
      DataUtil.getCoinData(coin, 'HistoricalAllTime').then(this.bindData.bind(this));
    },

    bindData(data) {
      var ohlc = [],
        volume = [];
      if (data.length > 0) {
        data = _.orderBy(data, function(itm) {
          return new Date(itm.Date).getTime();
        });
        _.forEach(data, function(itm) {
          var time = new Date(itm.Date).getTime();
          ohlc.push([time, parseFloat(itm.Open), parseFloat(itm.High), parseFloat(itm.Low), parseFloat(itm.Close)]);
          volume.push([time, parseFloat(itm.Volume.replace(/,/g, ''))])
        });

        this.series = this.getSeries(ohlc, volume);
      }
    },

    getSeries(ohlc, volume) {
      return [{
          type: 'candlestick',
          name: 'ohlc',
          id: 'ohlc',
          zIndex: 2,
          data: ohlc
        },
        {
          type: 'macd',
          name: 'MACD',
          id: 'macd',
          linkedTo: 'ohlc',
          yAxis: 1
        }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: volume,
          yAxis: 2
        }, {
          type: 'ikh',
          linkedTo: 'ohlc',
          zIndex: 1,
          enableMouseTracking: false,
          marker: {
            enabled: false
          }
        }, {
          type: 'sma',
          linkedTo: 'ohlc',
          enableMouseTracking: false,
          zIndex: 2,
          marker: {
            enabled: false
          }
        }
      ]
    }
  }
}
</script>
