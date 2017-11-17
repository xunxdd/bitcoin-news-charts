<template>
<highstock :options="chartOptions" ref="IndictorsChart" style="min-width: 400px; height: 600px; max-width: 900px; overflow: auto "></highstock>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'IndicatorsChart',
  props: ['series', 'coin'],
  watch: {
    'series': 'updateChart',
    'coin': 'updateTitle'
  },
  data() {
    var groupingUnits = [
      [
        'week', // unit name
        [1] // allowed multiples
      ],
      [
        'month', [1, 2, 3, 4, 6]
      ]
    ];

    var options = {
      title: {
        text: _.capitalize(this.coin.replace('-', ' ')) + ' Financial Chart'
      },
      subtitle: {
        text: 'With SMA, MACD and Ichimoku technical indicators'
      },
      rangeSelector: {
        selected: 1
      },
      yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          top: '60%',
          height: '20%',
          labels: {
            align: 'right',
            x: -3
          },
          offset: 0,
          title: {
            text: 'MACD'
          }
        },
        {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '80%',
          height: '20%',
          offset: 0,
          lineWidth: 2
        }
      ],

      tooltip: {
        split: true
      },

      plotOptions: {
        series: {
          dataGrouping: {
            units: groupingUnits
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
      var chart = this.$refs['IndictorsChart'].chart;
      while (chart.series.length > 0) {
        chart.series[0].remove(true);
      }

      _.forEach(this.series, function(serie, index) {
        chart.addSeries(serie);
      });
      chart.redraw()
    },
    updateTitle() {
      var chart = this.$refs['IndictorsChart'].chart;
      chart.setTitle({text: _.capitalize(this.coin.replace('-', ' ')) + ' Financial Chart'});
    }
  }
}
</script>
