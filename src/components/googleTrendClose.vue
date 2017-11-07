<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <h4>{{title}} Bitcoin Google Trend and Price Close</h4>
      <h5>({{this.dateSpan.startDate}} - {{this.dateSpan.endDate}})</h5>
    </v-flex>
    <v-flex xs12 sm12>
      <google-trend-close-line
      :data-set="dataSet"
      :dimension="dimension"
      title="bitcoin" >
      </google-trend-close-line>
    </v-flex>
    <v-flex xs8 center>
      <div class="white--text">
        Devour the MACD (Moving average convergence divergence), RSI (The Relative Strength Index), drink up the candlesticks, digest the volumes and percentages. Have a wild ride!
      </div>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import GoogleTrendCloseLine from './charts/googleTrendCloseLine'
import DataUtil from '../services/DataUtil'

export default {
  name: 'GoogleTrendAndPriceChart',
  components: {
    GoogleTrendCloseLine
  },
  props: {
    coin: String
  },
  methods: {
    fetchData() {
      let coin = this.coin || 'bitcoin';
      this.title = DataUtil.getCoinName(coin);
      let p1 = DataUtil.getCoinData(coin, 'PastThreeMonths');
      let p2 = DataUtil.getGoogleTrendData(coin, 'PastThreeMonths');
      var promises = [p1, p2];
      Promise.all(promises).then(this.bindData.bind(this));
    },

    bindData(results) {
      this.dataSet = {
        chartData: results[0],
        trendData: results[1]
      };
      if (results[0].length > 0) {
        this.dateSpan = this.getDateSpan(results[0]);
      }
    },

    getDateSpan(data) {
      let len = data.length;
      return {
        startDate: data[len - 1].Date,
        endDate: data[0].Date
      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  data() {
    return {
      dataSet: {},
      title: '',
      dateSpan: {},
      dimension: {
        width: 960,
        height: 500,
        margin: {
          top: 20,
          right: 50,
          bottom: 30,
          left: 50
        }
      }
    }
  }
}
</script>
