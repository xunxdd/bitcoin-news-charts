<template>
<highstock :options="chartOptions" ref="vue-high-chart" style="min-width: 400px; height: 400px; max-width: 900px "></highstock>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'TrendChart',
  props: ['series'],
  watch: {
    'series': 'updateChart'
  },
  data() {
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
          tickInterval: 1000,
          labels: {
            style: {
              color: '#000000'
            }
          },
          title: {
            text: 'Marketcap',
            style: {
              color: '#000000'
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
      series: []
    };
    return {
      chartOptions: options
    }
  },
  methods: {
    updateChart() {
      var chart = this.$refs['vue-high-chart'].chart;
      _.forEach(this.series, function(serie, index) {
        chart.addSeries(serie);
      });
      chart.redraw()
    }
  }
}
</script>
