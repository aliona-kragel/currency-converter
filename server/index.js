import express from 'express';
import cors from 'cors';
import { currencyApi } from './api/index.js';
import { getShortedCurrencies, transformCurrencyDataToRates } from './helpers/index.js';

const PORT = 3001;
const app = express();

let allCurrencies = [];
let exchangeRatesUSD = {};
let shortedCurrancies = [];

app.use(cors());
app.use(express.json()); // Разрешите использование JSON в запросах

//получили данные из api
currencyApi.getCurrenciesList()
  .then(res => {
    if (res && Array.isArray(res)) {
      allCurrencies = res;
      exchangeRatesUSD = transformCurrencyDataToRates(res);
      shortedCurrancies = getShortedCurrencies(res);
      console.log("exchangeRatesUSD", exchangeRatesUSD);
      console.log(shortedCurrancies);
    } else {
      console.error('Get invalid currencies data');
    }
  })
  .catch(error => {
    console.error('Fetching error', error);
  });

//возвращает данные для селекта
app.get('/ShortedCurrenciesInfo', (req, res) => {
  res.json(shortedCurrancies)
})

//возвращает весь массив данных из банка 
app.get('/AllCurrenciesInfo', (req, res) => {
  res.json(allCurrencies)
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});