<style>

.navigation-drawer>.list .list--group__container .list__tile--active .list__tile__title.white-link {
    color: whitesmoke;
}

.margin-right-20 {
    margin-right: 20px;
}

</style>

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
        <div class="text-xs-right margin-right-20 hidden-sm-and-down">
            <span class="margin-right-20">Updated @ {{tickerData.updated}}</span>
            <span class="margin-right-20">Bitcoin: ${{tickerData.bitcoin.price_usd}}</span>
            <span class="margin-right-20">Ethereum: ${{tickerData.ethereum.price_usd}}</span>
            <span class="margin-right-20">Litecoin: ${{tickerData.litecoin.price_usd}}</span>
        </div>
        <a href="https://github.com/xunxdd/bitcoin-news-charts">
            <v-icon class="btn-white" style="color:white">fa-github</v-icon>
        </a>
    </v-toolbar>

</div>

</template>

<script>

import {
    NEWS_MENU,
    COINS
}
from './menu'
import _ from 'lodash'
import DataUtil from '../../services/DataUtil';

export default {
    name: 'NavigationDrawer',
    data: () => ({
        drawer: true,
        tickerData: {
            bitcoin: '',
            ethereum: '',
            litecoin: '',
            updated: ''
        }
    }),
    computed: {
        items: () => {
            var chartItems = {
                icon: 'trending_up',
                text: 'Financial Chart',
                active: true,
                items: []
            };
            var trendItems = {
                icon: 'fa-line-chart',
                text: 'Google Trend vs Price',
                active: false,
                items: []
            };
            var coins = _.cloneDeep(COINS);
            chartItems.items = _.map(coins, (item) => {
                console.log('chart', item.link)
                item.link = '/chart/' + item.link;
                return item;
            });
            var coins2 = _.cloneDeep(COINS);
            trendItems.items = _.map(coins2, (item) => {
                item.link = '/trend/' + item.link;
                return item;
            });
            var navItems = [chartItems, trendItems, NEWS_MENU];
            return navItems;
        }
    },
    methods: {
        loadData() {
            DataUtil.getMarketCapTicker().then(function(data) {
                this.tickerData = data;
                this.tickerData.updated = new Date().toLocaleTimeString();
                console.log(this.tickerData.updated);
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
