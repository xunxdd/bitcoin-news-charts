<script>
import FirebaseApp from '../services/firebase.srv'
import _ from 'lodash'
import moment from 'moment'
let newsRef = FirebaseApp.database().ref('/root');

export default {
  name: 'news',
  data () {
    return {
      news: ['Coin Desk']
    }
  },
  firebase: {
    coinDesk: newsRef.child('Coin-Desk').limitToLast(12)
  },
  computed: {
    newsParsed: function () {
      let newsItems = []
      _.each(this.coinDesk, (item) => {
        let dateStr = ''
        if (item.title && item.link) {
          if (item.timeStampInsert) {
            dateStr = moment(new Date(item.timeStampInsert)).format('MMMM Do YYYY, h:mm:ss a')
          }

          item.dateStr = dateStr
          newsItems.push(item)
        }
      })
      return newsItems
    }
  }
}
</script>

<template>
<div>
  <v-layout  row wrap>
    <v-flex xs12>
      <h3>Coin Desk</h3>
    </v-flex>
    <v-flex xs12 sm12  v-for="(newsItem, index) in newsParsed" :key="index">
      <v-card>
        <v-card-media v-if="newsItem.image" :src="newsItem.image" height="200px">
        </v-card-media>
        <v-card-title primary-title :to="newsItem.link">
          <div>
            <span class="grey--text">{{ newsItem.dateStr}}</span><br>
            <a :href="newsItem.link"  target="_blank" class="white--text"><h3 class="headline mb-0">{{newsItem.title}}</h3></a>
            <div v-if="newsItem.summary" v-html="newsItem.summary"></div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat class="orange--text">Share</v-btn>
          <a :href="newsItem.link" target="_blank" ><v-btn flat class="orange--text">Explore</v-btn></a>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</div>
</template>
