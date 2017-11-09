<template>
<v-card style="margin: 20px">
  <v-card-title class="white--text"  primary-title>
    <div>{{title}}</div>
    <v-spacer></v-spacer>
    <div>Value</div>
  </v-card-title>
  <v-list>
    <v-list-tile v-for="(item, index) in dataList" :key="index" @click="" v-if="index<10">
      <v-list-tile-content>
        <v-list-tile-title v-text="fieldText(item)"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action-text v-text="item.value"></v-list-tile-action-text>
    </v-list-tile>
  </v-list>
</v-card>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'trendList',
  props: ['dataList', 'title', 'field'],
  methods: {
    fieldText: function(item) {
      return _.get(item, this.field, '');
    }
  }
}
</script>
