/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */  
const currencies = [
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
  
  module.exports = currencies;