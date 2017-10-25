const BFX = require('bitfinex-api-node')
const API_CONFIG = require('../config/api/bitfinex.json')
const bws = new BFX(API_CONFIG.API_KEY, API_CONFIG.API_SECRET, API_CONFIG.opts).ws

bws.on('auth', () => {
  console.log('you are in')
})

bws.on('open', () => {
  bws.subscribeTicker('BTCUSD')
})

bws.on('ticker', (pair, ticker) => {
  console.log('Ticker:', ticker)
})

bws.on('error', console.error)
