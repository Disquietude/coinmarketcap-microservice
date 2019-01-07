# CoinMarketCap Microservice

Microservice that makes requests to the CoinMarketCap API.

## API Endpoints

### /api/map/:limit?

Returns a paginated list of all cryptocurrencies by CoinMarketCap ID.

Route Parameters:
  * limit (Optional): Integer from 1-5000. Specifies the number of results to return.

### /api/quotes/:ids/:convert?

Returns the latest market quote for 1 or more cryptocurrencies.

Route Parameters:
  * ids: String (ex: 1,2). One or more comma-separated cryptocurrency CoinMarketCap IDs. 
  * convert (Optional): String (ex: BTC). Converts prices to the selected currency. Must be 3 uppercase letters.