<template>
<highstock :options="chartOptions" ref="trendchart" style="min-width: 400px; height: 300px; max-width: 900px "></highstock>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'TrendChart',
  props: ['trendData'],
  watch: {
    'trendData': 'updateChart'
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
      chart: {
        alignTicks: false
      },
      rangeSelector: {
        selected: 5
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'left'
        }
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
            text: 'Price',
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
      var chart = this.$refs['trendchart'].chart;
      if (!this.trendData.trend || !this.trendData.price) {
        return;
      }

      var trendSerie = this.getTrendSerie(this.trendData.trend);
      var priceSerie = this.getPriceSerie(this.trendData.price, this.trendData.trend);
      while (chart.series.length > 0) {
        chart.series[0].remove(true);
      }
      chart.addSeries(priceSerie);
      chart.addSeries(trendSerie);
      chart.redraw();
    },

    getTrendSerie(data) {
      data = _.orderBy(data, function(itm) {
        return new Date(itm.date).getTime();
      });
      data = _.map(data, (itm) => {
        return [new Date(itm.date).getTime(), itm.value];
      });
      return {
        type: 'spline',
        id: 'google-trends',
        name: 'Google trend',
        data: data,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      };
    },

    getPriceSerie(data, trendData) {
      data = _.orderBy(data, function(itm) {
        return new Date(itm.Date).getTime();
      });
      var times = _.map(trendData, (itm) => {
        return new Date(itm.date).getTime()
      });
      var priceData = [];
      _.forEach(data, (itm) => {
        var time = new Date(itm.Date).getTime();
        if (_.includes(times, time)) {
          priceData.push([time, parseFloat(itm.High)])
        }
      });
      return {
        yAxis: 1,
        name: 'Price',
        id: 'price',
        data: priceData,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      }
    }
  }
}
</script>
