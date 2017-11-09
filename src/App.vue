<template>
<v-app dark id="inspire">
  <NavigationDrawer></NavigationDrawer>
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
  <template>
  <v-footer app color="grey darken-1" fixed>
    <span class="white--text"><a href="#" class="white-text">xun</a> &copy; 2017</span>
    <v-spacer />
    <span class="white--text">
    Buy me a coffee? Bitcoin Address: 1JEipwJjeWz96pCoCmLb6fYwK64Qj2tE7f &nbsp;&nbsp;&nbsp; Litecoin:
    LaNSUmsUidJmNfFQnbWwPFv4c9jUh5rXVD
    </span>
  </v-footer>
</template>
</v-app>
</template>

<script>
import NavigationDrawer from './components/navigation/NavigationDrawer'

export default {
  components: {
    NavigationDrawer
  },
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
