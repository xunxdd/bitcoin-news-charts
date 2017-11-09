<template>
<div>
  <v-navigation-drawer persistent clipped enable-resize-watcher v-model="drawer" app>
    <v-list dense>
      <v-list-group v-for="item in items" :value="item.active" :key="item.text" :router="!!item.link" :to="item.link">
        <v-list-tile slot="item" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.items">
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.text" :router="!!subItem.link" :to="subItem.link" v-if="item.items">
          <v-avatar size="16px">
            <img :src="`./static/${subItem.img}`" :alt="subItem.text">
          </v-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="white-link">{{ subItem.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="red" dense fixed clipped-left app>
    <v-icon @click.stop="drawer = !drawer">menu</v-icon>
    <v-toolbar-title class="ml-0 pl-3">
      <v-icon class="ml-3 fa-2x">fa-bitcoin</v-icon>
      News and Financial Charts
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row>
      <div class="text-xs-right">
        <span class="margin-right-20">BTC: ${{tickerData.bitcoin.price_usd}}</span>
        <span class="margin-right-20">Ethereum: ${{tickerData.ethereum.price_usd}}</span>
        <span class="margin-right-20">Litecoin: ${{tickerData.litecoin.price_usd}}</span>
      </div>
    </v-layout>
  </v-toolbar>
</div>
</template>

<script>
import {Menu} from './menu'
import DataUtil from '../../services/DataUtil';

export default {
  name: 'NavigationDrawer',
  data: () => ({
    drawer: true,
    items: Menu,
    tickerData: {
      bitcoin: '',
      ethereum: '',
      litecoin: ''
    }
  }),
  methods: {
    loadData() {
      DataUtil.getMarketCapTicker().then(function(data) {
        this.tickerData = data;
        console.log(this.tickerData);
      }.bind(this));
    }
  },
  mounted() {
    this.loadData();

    setInterval(function() {
      this.loadData();
    }.bind(this), 30000);
  }
}
</script>

<style>
.navigation-drawer>.list .list--group__container .list__tile--active .list__tile__title.white-link {
  color: whitesmoke;
}
.margin-right-20 {
  margin-right: 20px;
}
</style>
