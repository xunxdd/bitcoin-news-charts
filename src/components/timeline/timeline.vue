<template>
<div id="my-timeline"></div>
</template>
<script>
var createStoryJS = window.createStoryJS;

export default {
  components: {},
  props: ['timelineData'],
  watch: {
    'timelineData': 'reRender'
  },
  mounted() {
    createStoryJS({
      type: 'timeline',
      width: '960',
      height: '600',
      source: this.timelineData,
      embed_id: 'my-timeline'
    });
  },
  methods: {
    reRender() {
      this.$forceUpdate()
    }
  }
}
</script>
