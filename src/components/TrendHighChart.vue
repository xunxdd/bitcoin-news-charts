<template>
<v-layout row wrap>
  <v-flex xs10>
    <trend-chart :series="series"></trend-chart>
  </v-flex>
</v-layout>
</template>

<script>
import TrendChart from './highchart/TrendChart'
import DataUtil from '../services/DataUtil'
import _ from 'lodash'

export default {
  name: 'TrendHighChart',
  components: {
    TrendChart
  },
  data() {
    return {
      series: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      DataUtil.getChartDataTrendAndPrice('bitcoin').then(this.bindData.bind(this));
    },

    bindData(data) {
      var trendSerie = this.getTrendSerie(data.trendData);
      var marketCapSerie = this.getMarketCapSerie(data.priceData);
      var xvalues = _.map(trendSerie.data, 'x');
      marketCapSerie.data = _.filter(marketCapSerie.data, function(itm) {
        return _.includes(xvalues, itm.x);
      });
      marketCapSerie.data = _.orderBy(marketCapSerie.data, 'x');
      trendSerie.data = _.orderBy(trendSerie.data, 'x');
      this.series = [trendSerie, marketCapSerie]
    },

    getTrendSerie(data) {
      data = _.map(data, (itm) => {
        return {
          x: new Date(itm.date).getTime(),
          y: itm.value
        };
      });
      return {
        type: 'spline',
        id: 'google-trends',
        dashStyle: 'dash',
        name: 'Google trend',
        data: data,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      };
    },

    getMarketCapSerie(data) {
      data = _.map(data, (itm) => {
        return {
          x: new Date(itm.Date).getTime(),
          y: parseFloat(itm['High'].replace(/,/g, ''))
        };
      });
      return {
        yAxis: 1,
        name: 'Price',
        id: 'marketcap',
        data: data,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      }
    }
  }
}
</script>
