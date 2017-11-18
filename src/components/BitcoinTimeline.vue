<template>
<v-layout row wrap>
  <v-flex xs10>
    <time-line-chart :chartData="dataSet"></time-line-chart>
  </v-flex>
</v-layout>
</template>

<script>
import TimeLineChart from './highchart/TimeLineChart'
import DataUtil from '../services/DataUtil'

export default {
  name: 'BitcoinTimeLine',
  components: {
    TimeLineChart
  },
  data() {
    return {
      dataSet: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let p1 = DataUtil.getCoinData('bitcoin', 'HistoricalAllTime');
      let p2 = DataUtil.getTimeLineData();
      let p3 = DataUtil.getGoogleTrendData('bitcoin', 'HistoricalAllTime', 'trend');
      var promises = [p1, p2, p3];
      Promise.all(promises).then(this.bindData.bind(this));
    },

    bindData(results) {
      this.dataSet = {
        price: results[0],
        timeline: results[1],
        trend: results[2]
      };
    }
  }
}
</script>
