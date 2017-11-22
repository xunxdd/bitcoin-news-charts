<template>
<div id="my-timeline"></div>
</template>
<script>
import {TIME_LINE_DATA} from '../../assets/TIME_LINE';
var createStoryJS = window.createStoryJS;

export default {
  components: {},
  mounted() {
    createStoryJS({
      type: 'timeline',
      width: '960',
      height: '600',
      source: TIME_LINE_DATA,
      embed_id: 'my-timeline'
    });
  }
}
</script>
