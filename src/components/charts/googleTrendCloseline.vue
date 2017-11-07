<template>
<div id='GoogleTrend-CloseLine-chart'>
</div>
</template>
<script>
import chartDataUtil from './chartDataUtil';
var d3 = window.d3;
var techan = window.techan;

export default {
  name: 'GoogleTrendCloseLine',
  props: ['dataSet', 'dimension', 'title'],
  watch: {
    'dataSet': 'updateChart'
  },
  methods: {
    updateChart() {
      console.log('data change detected');
      d3.select('svg').remove()
      this.renderChart()
    },

    setSvg(dimension, title) {
      let margin = dimension.margin;
      let width = dimension.width - margin.left - margin.right;
      let height = dimension.height - margin.top - margin.bottom;

      let x = techan.scale.financetime()
        .range([0, width]).outerPadding(0);

      let y = d3.scaleLinear()
        .range([height, 0]);
      var y1 = d3.scaleLinear().range([height, 0]);
      let xAxis = d3.axisBottom(x)
      let yAxis = d3.axisLeft(y)
      let yRightAxis = d3.axisRight(y1);

      let svg = d3.select(this.$el)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      svg.append('g')
        .attr('class', 'close')

      svg.append('g')
        .attr('class', 'google');

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')

      svg.append('g')
        .attr('class', 'y axis')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

      svg.append('g')
        .attr('class', 'y axis-right')
        .attr('transform', 'translate(' + width + ',0)')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -12)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Google Trend');

      return {
        x: x,
        y: y,
        y1: y1,
        xAxis: xAxis,
        yAxis: yAxis,
        yRightAxis: yRightAxis,
        svg: svg
      }
    },

    renderChart() {
      console.log('redraw')
      let data = chartDataUtil.mapMarketCapData(this.dataSet.chartData);
      let trendData = chartDataUtil.mapGoogleTrendData(this.dataSet.trendData);
      console.log(trendData)
      let svgSetup = this.setSvg(this.dimension, this.title);
      let svg = svgSetup.svg;
      let y1 = svgSetup.y1;
      let x = svgSetup.x;
      let close = techan.plot.close().xScale(svgSetup.x).yScale(svgSetup.y)
      console.log(close)
      var valueline2 = d3.line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y1(d.value);
        });
      console.log(valueline2)

      let accessor = close.accessor()
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      svgSetup.x.domain(data.map(close.accessor().d))
      svgSetup.y.domain(techan.scale.plot.ohlc(data, close.accessor()).domain())
      svgSetup.y1.domain([0, d3.max(trendData, function(d) {
        return Math.max(d.value);
      })]);
      var c = svg.selectAll('g.close').datum(data).call(close)
      console.log(c)
      // var s = svg.selectAll('g.google').data(trendData).call(valueline2)
      // console.log(s)
      svg.selectAll('g.google').append('path')
        .data([trendData])
        .attr('class', 'line')
        .attr('d', valueline2)
      svg.selectAll('g.x.axis').call(svgSetup.xAxis)
      svg.selectAll('g.y.axis').call(svgSetup.yAxis)
      svg.selectAll('g.y.axis-right').call(svgSetup.yRightAxis)
    }
  },

  mounted() {
    this.renderChart()
  }

}
</script>

<style src='./style.css'></style>
