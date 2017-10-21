<template>
<v-app dark id="inspire">
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
        <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.text" @click="" v-if="item.items">
          <v-avatar size="16px">
            <img :src="`./static/images/${subItem.img}`" :alt="subItem.text">
          </v-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.img }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>

    <v-list-tile class="mt-3" @click="">
      <v-list-tile-action>
        <v-icon color="grey darken-1">add_circle_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
    </v-list-tile>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon color="grey darken-1">settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
    </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="red" dense fixed clipped-left app>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="ml-3">fa-youtube</v-icon>
    </v-toolbar-title>
    <v-layout row align-center style="max-width: 650px">
      <v-text-field placeholder="Search..." single-line append-icon="search" :append-icon-cb="() => {}" class="white--text" hide-details></v-text-field>
    </v-layout>
  </v-toolbar>
  <main>
    <v-content>
      <v-container fill-height>
        <v-layout>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </main>
</v-app>
</template>

<script>
import {Menu} from './components/navigation/menu'

export default {
  data: () => ({
    drawer: true,
    items: Menu
  }),
  props: {
    source: String
  }
}
</script>

<style>
.input-group__details:after {
  background-color: rgba(255, 255, 255, 0.32) !important;
}
a {
  text-decoration: none;
}
</style>
