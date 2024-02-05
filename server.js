const express = require('express')  // We import the express application
const cors = require('cors')// Necessary for localhost
const { unknownEnd } = require('./utils/middleware');
const morgan = require('morgan'); 
const app = express() // Creates an express application in app


unknownEnd(app);
app.use(morgan('dev'))

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3003/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3003/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3003/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
    const currency = parseInt(request.params.id);
    const detail =  currencies.find((call) => call.id === currency);
    if(!detail) {
      return response.status(404).json({ error: 'resource not found' })
    }
    response.json(info);
})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3003/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency', (request, response) => {
  const {currrencyCode, country, conversionRate} = request.body;
  if (!currrencyCode || !country || !conversionRate) {
    return response.status(400).json( { error: 'content missing' })
  }
  const posting = {currrencyCode, country, conversionRate}
    currencies.push(posting);
    console.log('posting currency :', posting)
    response.status(201).json(posting);
});

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3003/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.put('/api/currency/:id/:newRate', (request, response) => {
  const Currency = parseInt(request.params.id);
  const currencyRatio = parseFloat(request.params.newRate);
  const ratio = currencies.find((call) => call.id === Currency);
  if (!ratio) {
    return response.status(404).json({error : 'resource not found'})
  }
  ratio.conversionRate = currencyRatio;
  response.json(ratio);
})

//unknownEND
app.use((request,response) => {
  response.status(404).json({error: 'unknown endpoint'})
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3003/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.delete('/api/currency/:id', (request, response) => {
  const discard = parseInt (request.params.id)
  currencies = currencies.filter((call) => call.id !== discard)
  response.sendStatus(204);
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})