<template>
<highstock :options="options" ref="timeline" style="min-width: 400px; height: 400px; max-width: 900px "></highstock>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'TimeLineChart',
  props: ['chartData'],
  watch: {
    'chartData': 'updateChart'
  },
  data() {
    var options = {
      chart: {
        alignTicks: false
      },
      rangeSelector: {
        selected: 4
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'left'
        }
      },
      title: {
        text: 'Bitcoin Historical Events'
      },
      tooltip: {
        style: {
          width: '250px'
        }
      },
      yAxis: [{
        max: 100,
        min: 0,
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
        gridLineColor: 'rgba(0, 0, 0, 0.07)'
      }, {
        allowDecimals: false,
        labels: {
          style: {
            color: '#000'
          }
        },
        title: {
          text: 'Price',
          style: {
            color: '#000'
          }
        },
        opposite: true,
        gridLineWidth: 0
      }],
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
      options: options
    }
  },
  methods: {
    updateChart() {
      let chart = this.$refs.timeline.chart;

      this.chartData.price = _.orderBy(this.chartData.price, function(itm) {
        return new Date(itm.Date).getTime();
      });
      this.chartData.price = _.filter(this.chartData.price, function(itm) {
        return new Date(itm.Date).getTime() < new Date('09/01/2017').getTime();
      });
      this.chartData.trend = _.filter(this.chartData.trend, function(itm) {
        return new Date(itm.date).getTime() < new Date('09/01/2017').getTime();
      });
      let trendSerie = this.getTrendSerie(this.chartData.trend);
      let timeLineSerie = this.getTimeLineSerie(this.chartData.timeline, this.chartData.price);
      let priceSerie = this.getPriceSerie(this.chartData.price);
      while (chart.series.length > 0) {
        chart.series[0].remove(true);
      }
      chart.addSeries(trendSerie);
      chart.addSeries(priceSerie);
      chart.addSeries(timeLineSerie);
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

    getTimeLineSerie(timelineData, priceData) {
      var startDate = new Date(priceData[0].Date),
        endDate = new Date(priceData[priceData.length - 1].Date);
      timelineData = _.filter(timelineData, (data) => {
        var date = new Date(data.date);
        return date >= startDate && date <= endDate;
      });
      timelineData = _.orderBy(timelineData, function(itm) {
        return new Date(itm.date).getTime();
      });
      timelineData = _.map(timelineData, (itm, index) => {
        itm.date = new Date(itm.date).getTime();
        return {
          x: itm.date,
          text: itm.title,
          title: (index + 1)
        };
      });

      return {
        type: 'flags',
        name: 'Events',
        color: '#333333',
        fillColor: 'rgba(255,255,255,0.6)',
        data: timelineData,
        shape: 'squarepin',
        onSeries: 'price',
        showInLegend: false
      };
    },

    getPriceSerie(data) {
      data = _.map(data, (itm) => {
        return [new Date(itm.Date).getTime(), parseFloat(itm.High)];
      });
      return {
        name: 'price',
        yAxis: 1,
        id: 'price',
        data: data,
        tooltip: {
          xDateFormat: '%B %Y'
        }
      }
    }
  }
}
</script>
