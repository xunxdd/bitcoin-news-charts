<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <div id='event-chart' class="financial-chart">
      </div>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
var d3 = window.d3;
export default {
  name: 'EventDropChart',
  mounted() {
    var endTime = Date.now();
    var day = 24 * 60 * 60 * 1000;
    var startTime = endTime - 0.5 * day;

    d3.select(this.$el)
      .attr('width', 900)
      .attr('height', 300)
      .datum(this.chartData)
      .call(window.eventDrops.default());
  },
  watch: {},
  data() {
    return {
      chartData: [{
          name: 'http requests',
          data: [new Date('2014/09/15 13:24:54'), new Date('2014/09/15 13:25:03'), new Date('2014/09/15 13:25:05')]
        },
        {
          name: 'SQL queries',
          data: [new Date('2014/09/15 13:24:57'), new Date('2014/09/15 13:25:04'), new Date('2014/09/15 13:25:04')]
        },
        {
          name: 'cache invalidations',
          data: [new Date('2014/09/15 13:25:12')]
        }
      ]
    }
  }
}
</script>
