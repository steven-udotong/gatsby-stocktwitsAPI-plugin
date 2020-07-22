# `gatsby-stocktwits-symbol`

Pulls data about recent stocktwit messages under a given stock symbol, (EX: SPY, AAPL, TSLA)

## Example

In your `gatsby-config.js`:
```js
module.exports = {
  
  plugins: [
    
    {
      resolve: 'gatsby-stocktwits-symbol',
      options: {
        // get this at https://api.stocktwits.com/developers/apps/new 
        apikey: 'your_api_key',   
        stockId: 'SPY',
        maxTweets: 30, //optional, default is 20     
      }
    },
}
```
