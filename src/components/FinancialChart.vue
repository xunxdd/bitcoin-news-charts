<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <h4>{{title}} Financial Chart</h4>
      <h5>({{this.dateSpan.startDate}} - {{this.dateSpan.endDate}})</h5>
    </v-flex>
    <v-flex xs12 sm12>
      <chart :chart-data="chartData" :dimension="dimension" :title="title"></chart>
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
import Chart from './charts/chart'
import {
  CoinData
} from '../assets/coinData'
import DataUtil from '../services/DataUtil'

export default {
  name: 'AllPlotsChart',
  components: {
    Chart
  },
  props: {
    coin: String
  },
  methods: {
    fetchData() {
      let coin = this.coin || 'bitcoin';
      this.chartData = CoinData[coin];
      this.title = DataUtil.getCoinName(coin);
      this.dateSpan = this.getDateSpan(this.chartData);
      DataUtil.getCoinData(coin, 'PastThreeMonths').then(this.bindData.bind(this));
    },

    bindData(data) {
      if (data.length > 0) {
        this.chartData = data;
        this.dateSpan = this.getDateSpan(data);
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
      chartData: [],
      title: '',
      dataSpan: {},
      dimension: {
        width: 960,
        height: 500,
        margin: {
          top: 20,
          right: 50,
          bottom: 30,
          left: 50
        },
        ohlc: {
          height: 305
        },
        indicator: {
          height: 65,
          padding: 5
        }
      }
    }
  }
}
</script>
