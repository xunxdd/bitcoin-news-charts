import NewsService from '@/api/newsService'

describe('newsService', () => {
  it('should getnews', () => {
    let news = NewsService.newsFromSrc('Coin-Desk');
    console.log(news)
  })
})
