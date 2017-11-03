import moment from 'moment'
import _ from 'lodash'

const NewsSources = {
  'coin-desk': {
    Name: 'Coin Desk'
  },
  'bitcoin-magzine': {
    Name: 'Bitcoin Magzine'
  },
  'crypto-coin-news': {
    Name: 'CryptoCoins News'
  },
  'coin-telegraph': {
    Name: 'Coin Telegraph'
  },
  'news-bitcoin': {
    Name: 'News Bitcoin'
  },
  'subreddit-bitcoin': {
    Name: 'reddit/r/bitcoin'
  },
  'subreddit-cryptocurrency': {
    Name: 'reddit/r/cryptocurrency'
  }
}

const DefaultNewsSrcName = 'Coin Desk'

export default {
  getNewsItems(snapshot) {
    let val = {}
    let dateStr = ''
    let newsItems = []
    snapshot.forEach(function(obj) {
      val = obj.val()
      if (val.timeStampInsert) {
        dateStr = moment(new Date(val.timeStampInsert)).format('MMMM Do YYYY, h:mm:ss a')
      }

      if (val.link && val.title) {
        val.dateStr = dateStr
        newsItems.push(val)
      }
    })

    return newsItems
  },

  getNewsSrcName(src) {
    return _.get(NewsSources[src], 'Name', DefaultNewsSrcName)
  }
}
