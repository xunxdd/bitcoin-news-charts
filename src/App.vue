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
