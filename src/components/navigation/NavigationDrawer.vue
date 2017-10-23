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
            <img :src="`./static/images/${subItem.img}`" :alt="subItem.text">
          </v-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- <v-subheader class="mt-3 grey--text text--darken-1"></v-subheader>

    <v-list-tile class="mt-3" @click="">
      <v-list-tile-action>
        <v-icon color="grey darken-1">add_circle_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
    </v-list-tile>
  -->  
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
</div>
</template>

<script>
import {
  Menu
} from './menu'

export default {
  name: 'NavigationDrawer',
  data: () => ({
    drawer: true,
    items: Menu
  })
}
</script>
