<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <h5>{{title}} Google Trend and Price</h5>
      <h6>({{this.dateSpan.startDate}} - {{this.dateSpan.endDate}})</h6>
    </v-flex>
    <v-flex xs12 sm12>
      <google-trend-close-line :data-set="dataSet" :dimension="dimension" title="bitcoin">
      </google-trend-close-line>
    </v-flex>
    <v-flex xs12 sm12>
      <h5>{{title}} Google Trend Regional Interest</h5>
      <geo-chart :data="trendData.regional" height="300px" width="960px" display-mode="regional"></geo-chart>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <trend-list :data-list="trendData.queries" title="Search Queries" field="query"></trend-list>
      </v-flex>
      <v-flex xs12 sm5>
        <trend-list :data-list="trendData.topics" title="Search Topics" field="topic.title"></trend-list>
      </v-flex>
    </v-layout>
  </v-layout>
</div>
</template>

<script>
import GoogleTrendCloseLine from './charts/googleTrendCloseLine'
import TrendList from './lists/TrendList'
import DataUtil from '../services/DataUtil'
import _ from 'lodash'

export default {
  name: 'GoogleTrendAndPriceChart',
  components: {
    GoogleTrendCloseLine,
    TrendList
  },
  props: {
    coin: String
  },
  methods: {
    fetchData() {
      console.log(this.coin);
      let coin = this.coin || 'bitcoin';
      this.title = DataUtil.getCoinName(coin);
      let p1 = DataUtil.getCoinData(coin, 'HistoricalAllTime');
      let p2 = DataUtil.getGoogleTrendData(coin, 'HistoricalAllTime', 'trend');
      var promises = [p1, p2];
      Promise.all(promises).then(this.bindData.bind(this));
      this.fetchRelatedTrendData(coin);
    },

    fetchRelatedTrendData(coin) {
      let p1 = DataUtil.getRegionalInterestData(coin);
      let p2 = DataUtil.getRelatedQueryData(coin);
      let p3 = DataUtil.getRelatedTopicsData(coin);
      var promises = [p1, p2, p3];
      Promise.all(promises).then(this.bindTrendData.bind(this));
    },

    bindTrendData(results) {
      this.trendData = {
        regional: results[0],
        queries: results[1],
        topics: results[2]
      };
    },

    bindData(results) {
      this.dataSet = {
        chartData: results[0],
        trendData: results[1]
      };
      if (results[0].length > 0) {
        this.dateSpan = this.getDateSpan(results[0]);
        this.dataSet.trendData = _.filter(this.dataSet.trendData, (data) => {
          var trendDate = new Date(data.date);
          return trendDate >= new Date(this.dateSpan.startDate) && trendDate <= new Date(this.dateSpan.endDate);
        })
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
  mounted() {
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
      trendData: {
        regional: []
      },
      dimension: {
        width: 960,
        height: 300,
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
