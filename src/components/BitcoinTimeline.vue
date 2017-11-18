<template>
<v-layout row wrap>
  <v-flex xs10>
    <time-line-chart></time-line-chart>
  </v-flex>
</v-layout>
</template>

<script>
import TimeLineChart from './highchart/TimeLineChart'
import DataUtil from '../services/DataUtil'
import _ from 'lodash';

export default {
  name: 'BitcoinTimeLine',
  components: {
    TimeLineChart
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var p1 = DataUtil.getTimeLineData();
      var p2 = DataUtil.getChartDataTrendAndPrice('bitcoin');
      Prom
      DataUtil.getTimeLineData().then((data) => {
        data = _.filter(data, (itm) => {
          return new Date(itm.date) >= new Date('04/20/2013');
        });
        data = _.orderBy(data, function (itm) {
          return new Date(itm.date)
        });
        data = _.map(data, (itm, index) => {
          itm.date = new Date(itm.date).getTime();
          return {
            x: new Date(itm.date).getTime(),
            text: itm.title,
            title: index
          };
        })
      });
      // DataUtil.getChartDataTrendAndPrice('bitcoin').then(this.bindData.bind(this));
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
      this.series = [trendSerie, marketCapSerie];
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
      var ys = _.map(data, 'y');
      console.log(Math.max.apply(this, ys));
      return {
        yAxis: 1,
        name: 'Market Cap',
        id: 'marketcap',
        type: 'area',
        data: data,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      }
    }
  }
}
</script>
