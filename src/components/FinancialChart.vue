<template>
<div>
  <h4>{{coin}} Financial Chart ()</h4>
  <chart :chart-data="chartData" :dimension="dimension" :title="title"></chart>
</div>
</template>

<script>
import Chart from './charts/chart'
import {
  CoinData
} from '../assets/coinData'

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
      console.log('dgag', this.coin)
      this.chartData = CoinData[this.coin];
      this.title = this.coin;
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
