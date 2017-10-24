<script>
import FirebaseApp from '../services/firebase.srv'
import NewsService from '../services/newsUtil'
let newsRef = FirebaseApp.database().ref('/root');

export default {
  name: 'news',
  props: {
    src: String
  },
  data() {
    return {
      newsItems: [],
      srcName: ''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.src = this.src || 'coin-desk';
      this.srcName = NewsService.getNewsSrcName(this.src);
      const ref = newsRef.child(this.src).limitToLast(12);
      ref.once('value', this.bindData.bind(this));
    },

    bindData(snapshot) {
      this.newsItems = NewsService.getNewsItems(snapshot);
    }
  }
}
</script>

<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <h3>{{srcName}}</h3>
    </v-flex>
    <v-flex xs12 sm12 v-for="(newsItem, index) in newsItems" :key="index">
      <v-card>
        <v-card-media v-if="newsItem.image" :src="newsItem.image" height="200px" width="500px">
        </v-card-media>
        <v-card-title primary-title :to="newsItem.link">
          <div>
            <span class="grey--text">{{ newsItem.dateStr}}</span><br>
            <a :href="newsItem.link" target="_blank" class="white--text"><h3 class="headline mb-0">{{newsItem.title}}</h3></a>
            <div v-if="newsItem.summary" v-html="newsItem.summary"></div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <a :href="newsItem.link" target="_blank">
            <v-btn flat class="orange--text">Explore</v-btn>
          </a>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</div>
</template>
