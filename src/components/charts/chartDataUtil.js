var d3 = window.d3;

export default {
  mapMarketCapData(data) {
    var parseDate = d3.timeParse('%b %d, %Y');
    if (!data) {
      return [];
    }
    return data.map(function(d) {
      var volume = parseFloat(d.Volume.replace(/,/g, '')) / 1000;
      return {
        date: parseDate(d.Date),
        open: +d.Open,
        high: +d.High,
        low: +d.Low,
        close: +d.Close,
        volume: +volume
      };
    })
  },

  mapGoogleTrendData(data) {
    if (!data) {
      return [];
    }
    var parseDate = d3.timeParse('%b %d, %Y');
    return data.map(function(d) {
      return {
        date: parseDate(d.date),
        value: +d.value
      };
    })
  }
}
