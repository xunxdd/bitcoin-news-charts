<template>
  <div id="fin-chart">
  </div>
</template>
<script>
import chartDataUtil from './chartDataUtil';

var d3 = window.d3;
var techan = window.techan;

export default {
  name: 'chart',
  props: ['chartData', 'dimension', 'title'],
  watch: {
    'chartData': 'updateChart'
  },
  methods: {
    updateChart() {
      console.log('data change detected');
      d3.select('svg').remove()
      this.renderChart()
    },

    getDim(dimension) {
      var dim = dimension;
      dim.plot = {
        width: dim.width - dim.margin.left - dim.margin.right,
        height: dim.height - dim.margin.top - dim.margin.bottom
      };
      dim.indicator.top = dim.ohlc.height + dim.indicator.padding;
      dim.indicator.bottom = dim.indicator.top + dim.indicator.height + dim.indicator.padding;
      return dim;
    },

    setSvg() {
      var dim = this.getDim(this.dimension);
      var indicatorTop = d3.scaleLinear()
        .range([dim.indicator.top, dim.indicator.bottom]);

      var x = techan.scale.financetime()
        .range([0, dim.plot.width]);

      var y = d3.scaleLinear()
        .range([dim.ohlc.height, 0]);

      var svg = d3.select(this.$el)
        .append('svg')
        .attr('width', dim.width)
        .attr('height', dim.height);

      var defs = svg.append('defs');

      defs.append('clipPath')
        .attr('id', 'ohlcClip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', dim.plot.width)
        .attr('height', dim.ohlc.height);

      defs.selectAll('indicatorClip').data([0, 1])
        .enter()
        .append('clipPath')
        .attr('id', function(d, i) {
          return 'indicatorClip-' + i;
        })
        .append('rect')
        .attr('x', 0)
        .attr('y', function(d, i) {
          return indicatorTop(i);
        })
        .attr('width', dim.plot.width)
        .attr('height', dim.indicator.height);

      svg = svg.append('g')
        .attr('transform', 'translate(' + dim.margin.left + ',' + dim.margin.top + ')');

      svg.append('text')
        .attr('class', 'symbol')
        .attr('x', 20)
        .text(this.title);

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + dim.plot.height + ')');

      var ohlcSelection = svg.append('g')
        .attr('class', 'ohlc')
        .attr('transform', 'translate(0,0)');

      ohlcSelection.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + x(1) + ',0)')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -12)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

      ohlcSelection.append('g')
        .attr('class', 'close annotation up');

      ohlcSelection.append('g')
        .attr('class', 'volume')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'candlestick')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-0')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-1')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator ema ma-2')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'percent axis');

      ohlcSelection.append('g')
        .attr('class', 'volume axis');

      var indicatorSelection = svg.selectAll('svg > g.indicator').data(['macd', 'rsi']).enter()
        .append('g')
        .attr('class', function(d) {
          return d + ' indicator';
        });

      indicatorSelection.append('g')
        .attr('class', 'axis right')
        .attr('transform', 'translate(' + x(1) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'axis left')
        .attr('transform', 'translate(' + x(0) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'indicator-plot')
        .attr('clip-path', function(d, i) {
          return 'url(#indicatorClip-' + i + ')';
        });

      // Add trendlines and other interactions last to be above zoom pane
      svg.append('g')
        .attr('class', 'crosshair ohlc');

      svg.append('g')
        .attr('class', 'crosshair macd');

      svg.append('g')
        .attr('class', 'crosshair rsi');

      return {
        dim: dim,
        svg: svg,
        x: x,
        y: y,
        indicatorTop: indicatorTop
      }
    },

    renderChart() {
      console.log('redraw')
      var setup = this.setSvg();
      var x = setup.x;
      var y = setup.y;
      var svg = setup.svg;
      var dim = setup.dim;
      var indicatorTop = setup.indicatorTop;
      var yPercent = y.copy(); // Same as y at this stage, will get a different domain later

      var yVolume = d3.scaleLinear()
        .range([y(0), y(0.2)]);

      var candlestick = techan.plot.candlestick()
        .xScale(x)
        .yScale(y);

      var sma0 = techan.plot.sma()
        .xScale(x)
        .yScale(y);

      var sma1 = techan.plot.sma()
        .xScale(x)
        .yScale(y);

      var ema2 = techan.plot.ema()
        .xScale(x)
        .yScale(y);

      var volume = techan.plot.volume()
        .accessor(candlestick.accessor()) // Set the accessor to a ohlc accessor so we get highlighted bars
        .xScale(x)
        .yScale(yVolume);

      var xAxis = d3.axisBottom(x);

      var timeAnnotation = techan.plot.axisannotation()
        .axis(xAxis)
        .orient('bottom')
        .format(d3.timeFormat('%Y-%m-%d'))
        .width(65)
        .translate([0, dim.plot.height]);

      var yAxis = d3.axisRight(y);

      var ohlcAnnotation = techan.plot.axisannotation()
        .axis(yAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      var closeAnnotation = techan.plot.axisannotation()
        .axis(yAxis)
        .orient('right')
        .accessor(candlestick.accessor())
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      var percentAxis = d3.axisLeft(yPercent)
        .tickFormat(d3.format('+.1%'));

      var percentAnnotation = techan.plot.axisannotation()
        .axis(percentAxis)
        .orient('left');

      var volumeAxis = d3.axisRight(yVolume)
        .ticks(3)
        .tickFormat(d3.format(',.3s'));

      var volumeAnnotation = techan.plot.axisannotation()
        .axis(volumeAxis)
        .orient('right')
        .width(35);

      var macdScale = d3.scaleLinear()
        .range([indicatorTop(0) + dim.indicator.height, indicatorTop(0)]);

      var rsiScale = macdScale.copy()
        .range([indicatorTop(1) + dim.indicator.height, indicatorTop(1)]);

      var macd = techan.plot.macd()
        .xScale(x)
        .yScale(macdScale);

      var macdAxis = d3.axisRight(macdScale)
        .ticks(3);

      var macdAnnotation = techan.plot.axisannotation()
        .axis(macdAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      var macdAxisLeft = d3.axisLeft(macdScale)
        .ticks(3);

      var macdAnnotationLeft = techan.plot.axisannotation()
        .axis(macdAxisLeft)
        .orient('left')
        .format(d3.format(',.2f'));

      var rsi = techan.plot.rsi()
        .xScale(x)
        .yScale(rsiScale);

      var rsiAxis = d3.axisRight(rsiScale)
        .ticks(3);

      var rsiAnnotation = techan.plot.axisannotation()
        .axis(rsiAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      var rsiAxisLeft = d3.axisLeft(rsiScale)
        .ticks(3);

      var rsiAnnotationLeft = techan.plot.axisannotation()
        .axis(rsiAxisLeft)
        .orient('left')
        .format(d3.format(',.2f'));

      var ohlcCrosshair = techan.plot.crosshair()
        .xScale(timeAnnotation.axis().scale())
        .yScale(ohlcAnnotation.axis().scale())
        .xAnnotation(timeAnnotation)
        .yAnnotation([ohlcAnnotation, percentAnnotation, volumeAnnotation])
        .verticalWireRange([0, dim.plot.height]);

      var macdCrosshair = techan.plot.crosshair()
        .xScale(timeAnnotation.axis().scale())
        .yScale(macdAnnotation.axis().scale())
        .xAnnotation(timeAnnotation)
        .yAnnotation([macdAnnotation, macdAnnotationLeft])
        .verticalWireRange([0, dim.plot.height]);

      var rsiCrosshair = techan.plot.crosshair()
        .xScale(timeAnnotation.axis().scale())
        .yScale(rsiAnnotation.axis().scale())
        .xAnnotation(timeAnnotation)
        .yAnnotation([rsiAnnotation, rsiAnnotationLeft])
        .verticalWireRange([0, dim.plot.height]);

      var accessor = candlestick.accessor();
      var indicatorPreRoll = 33; // Don't show where indicators don't have data
      var data = chartDataUtil.mapMarketCapData(this.chartData).sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b));
      });

      x.domain(techan.scale.plot.time(data).domain());
      y.domain(techan.scale.plot.ohlc(data.slice(indicatorPreRoll)).domain());
      yPercent.domain(techan.scale.plot.percent(y, accessor(data[indicatorPreRoll])).domain());
      yVolume.domain(techan.scale.plot.volume(data).domain());

      var macdData = techan.indicator.macd()(data);
      macdScale.domain(techan.scale.plot.macd(macdData).domain());
      var rsiData = techan.indicator.rsi()(data);
      rsiScale.domain(techan.scale.plot.rsi(rsiData).domain());

      svg.select('g.candlestick').datum(data).call(candlestick);
      svg.select('g.close.annotation').datum([data[data.length - 1]]).call(closeAnnotation);
      svg.select('g.volume').datum(data).call(volume);
      svg.select('g.sma.ma-0').datum(techan.indicator.sma().period(10)(data)).call(sma0);
      svg.select('g.sma.ma-1').datum(techan.indicator.sma().period(20)(data)).call(sma1);
      svg.select('g.ema.ma-2').datum(techan.indicator.ema().period(50)(data)).call(ema2);
      svg.select('g.macd .indicator-plot').datum(macdData).call(macd);
      svg.select('g.rsi .indicator-plot').datum(rsiData).call(rsi);

      svg.select('g.crosshair.ohlc').call(ohlcCrosshair);
      svg.select('g.crosshair.macd').call(macdCrosshair);
      svg.select('g.crosshair.rsi').call(rsiCrosshair);

      svg.select('g.x.axis').call(xAxis);
      svg.select('g.ohlc .axis').call(yAxis);
      svg.select('g.volume.axis').call(volumeAxis);
      svg.select('g.percent.axis').call(percentAxis);
      svg.select('g.macd .axis.right').call(macdAxis);
      svg.select('g.rsi .axis.right').call(rsiAxis);
      svg.select('g.macd .axis.left').call(macdAxisLeft);
      svg.select('g.rsi .axis.left').call(rsiAxisLeft);

      // We know the data does not change, a simple refresh that does not perform data joins will suffice.
      svg.select('g.candlestick').call(candlestick.refresh);
      svg.select('g.close.annotation').call(closeAnnotation.refresh);
      svg.select('g.volume').call(volume.refresh);
      svg.select('g .sma.ma-0').call(sma0.refresh);
      svg.select('g .sma.ma-1').call(sma1.refresh);
      svg.select('g .ema.ma-2').call(ema2.refresh);
      svg.select('g.macd .indicator-plot').call(macd.refresh);
      svg.select('g.rsi .indicator-plot').call(rsi.refresh);
      svg.select('g.crosshair.ohlc').call(ohlcCrosshair.refresh);
      svg.select('g.crosshair.macd').call(macdCrosshair.refresh);
      svg.select('g.crosshair.rsi').call(rsiCrosshair.refresh);
    }
  },

  mounted() {
    this.renderChart()
  }

}
</script>

<style src='./style.css'></style>
