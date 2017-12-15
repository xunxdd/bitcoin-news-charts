# Coin News and Charts

* Last three month candlesticks charts of top 10 cryptocurrencies, including MACD, SMA. 

* Last three month google trend analysis (regional, search trend, search queries and topics).

* Collection of cryto currency news and discussions from CoinDesk, Bitcoin Magzine, CrytoCoin News, Coin Telegraph, News Bitcoin, Bitcoin Subreddit, Crypto-Currency Sub Reddit.

* Bitcoin timeline.

# See it in Action

[Bitcooin News and Charts](https://bitcoin-news-charts.herokuapp.com/#/ "Bitcoin News and Chart")

# Client Side

* Vue.js
* Financial charts is built using [highstock] (http://highcharts.com) (changed from earlier version which uses [D3.js] (https://d3js.org/) , [Techan.js] (http://techanjs.org/)
* Google trend map is using Google chart
* Bitcoin timeline uses [timeline.js] (http://timeline.knightlab.com) 

# Server Side Data Handling
Server Side Data is handled using seperate Node.js application. Trading data is from [CoinMarketCap](https://https://coinmarketcap.com/), Google trend data is from [Google Trend Api] (https://www.npmjs.com/package/google-trends-api). Timeline data from various sites, mostly [wikipedia] (https://en.wikipedia.org/wiki/History_of_bitcoin).

# Coming Next
* Twitter trend analysis and price overlay. Twitter storm that maps out influencers' circle
* Unit tests
* In depth analysis of financial Data and convergence of news, search and trading

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

