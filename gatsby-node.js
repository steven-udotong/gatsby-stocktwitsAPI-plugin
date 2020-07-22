const axios = require("axios"); 

const { useReducer } = require("react");

console.log(process.env.TEST_ENV_VAR)

// 2. Send a call to stocktwits API to retrieve tweets by ticker name

exports.sourceNodes = async ({ 
    actions, 
    createNodeId, 
    createContentDigest, 
}, options) => {
    const { apikey, stockId, maxTweets = 20} = options;

    const result = await axios({ 
        method: "GET",
        url: "https://api.stocktwits.com/api/2/streams/symbol/SPY.json", //If you want a different stream, change the "SPY.json" to something else, for example, "AAPL.json"; you also must change the 'id' parameter below to the new symbol 
        // this API used without authentication limits to 200 calls/hour 
        params: {
            key: apikey,
            id: stockId, //This is a required parameter in the steams/symbol 
            limit: maxTweets,
        },
    }).catch(error => {
        console.error(error.message)
    })

    const messages = result.data.messages     //tweets

    messages.forEach(message => {
        const node = {
            ...message,
            id: createNodeId(`StockTweet-${message.id}`), //needed to make Id unique, and adding 'StockTwit' increases the chance that its unique
            internal: {
                type: "StockTweet",
                contentDigest: createContentDigest(message),
            },
        }

        actions.createNode(node)
    })
}