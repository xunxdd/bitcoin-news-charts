<template>
<highstock :options="options" ref="timeline" style="min-width: 400px; height: 400px; max-width: 900px "></highstock>
</template>
<script>
import Vue from 'vue'
import _ from 'lodash'
import {
  TIMELINE_SERIES,
  TIMELINE_EVENTS
} from '../../assets/timelineData'
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock';
loadStock(Highcharts);
Vue.use(VueHighcharts, {
  Highcharts
});

export default {
  name: 'TimeLineChart',
  data() {
    var serieFlag = {
      type: 'flags',
      name: 'Events',
      color: '#333333',
      fillColor: 'rgba(255,255,255,0.8)',
      data: TIMELINE_EVENTS,
      onSeries: 'marketcap',
      showInLegend: false
    };
    var series = _.cloneDeep(TIMELINE_SERIES);
    series.push(serieFlag);
    var options = {
      chart: {
        alignTicks: false
      },
      rangeSelector: {
        selected: 1
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'left'
        }
      },

      title: {
        text: 'Highcharts and Highsoft timeline'
      },

      tooltip: {
        style: {
          width: '250px'
        }
      },

      yAxis: [{
          max: 100,
          min: 0,
          title: {
            text: ''
          },
          gridLineColor: 'rgba(0, 0, 0, 0.07)'
        },
        {
          allowDecimals: false,
          max: 130000,
          tickInterval: 1000,
          labels: {
            style: {
              color: Highcharts.getOptions().colors[2]
            }
          },
          title: {
            text: 'Marketcap',
            style: {
              color: Highcharts.getOptions().colors[2]
            }
          },
          opposite: true,
          gridLineWidth: 0
        }
      ],

      plotOptions: {
        series: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2
          },
          fillOpacity: 0.5
        },
        flags: {
          tooltip: {
            xDateFormat: '%B %e, %Y'
          }
        }
      },
      series: series
    };
    return {
      options: options
    }
  },
  methods: {
    updateChart() {
      let lineCharts = this.$refs.timeline.chart;
      console.log(lineCharts)
      lineCharts.addSeries(this.series)
    }
  }
}
</script>
