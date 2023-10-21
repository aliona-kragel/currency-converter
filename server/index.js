import express from 'express';
import cors from 'cors';
import { currencyApi } from './api/index.js';
import { getShortedCurrencies, calculateRate, convertAmount } from './helpers/index.js';

// todo: добавить валидационные ошибки/проверки на валидные запросы => спросить чат гпт на проверки
// todo: метод post принимать данные и отправлять
// todo: подключить бд
// todo: добавить таймер на проверку свежих данных

const PORT = 3001;
const app = express();

// fake bd
let allCurrencies = [];

app.use(cors());
app.use(express.json());

//получили данные из api
currencyApi.getCurrenciesList()
  .then(res => {
    if (res && Array.isArray(res)) {
      allCurrencies = res;
    } else {
      console.error('Get invalid currencies data');
    }
  })
  .catch(error => {
    console.error('Fetching error', error);
  });

//возвращает данные для селекта
app.get('/ShortedCurrencies', (req, res) => {
  const shortedCurrancies = getShortedCurrencies(allCurrencies);
  res.json(shortedCurrancies);
})

//возвращает весь массив данных из банка 
app.get('/Currencies', (req, res) => {
  res.json(allCurrencies)
})

// ----------------------------------------------------------------
const fakeRequest = {
  changedCurrency: {
    id: 431,
    abbr: 'USD',
    value: 100, // сумма которую вводили
  },
  displayedCurrencies: ['RUB', 'BYN', 'USD'],
};

//возвращает  из фронта данные изменненной валюты и список отображенных на экране, чтобы пересчитать
app.post('/UpdateCurrencies', (req, res) => {
  // const requestData = req.body;

  const { changedCurrency, displayedCurrencies } = fakeRequest; // updateCurrency - то что вводили, displayedCurrencies - то что отображено на стр

  const filteredCurrencies = allCurrencies.filter(({ Cur_Abbreviation }) => displayedCurrencies.includes(Cur_Abbreviation)) //отображенные на экране

  const baseRate = filteredCurrencies.find(({ Cur_ID }) => Cur_ID === changedCurrency.id).Cur_OfficialRate; // ищем rate валюты которую изменили

  const rates = {};
  filteredCurrencies.forEach(({ Cur_Abbreviation, Cur_OfficialRate, Cur_Scale }) => {
    rates[Cur_Abbreviation] = calculateRate(baseRate, Cur_OfficialRate, Cur_Scale);
  }); // генерируем объект с рейтами отображаемых валют
  rates['BYN'] = baseRate; // добавляем BYN рейт валюту, потому что в апи не приходит BYN 

  const convertedCurrencies = {};
  displayedCurrencies.forEach((abbr) => {
    convertedCurrencies[abbr] = convertAmount(changedCurrency.value, rates[abbr]);
  }); // формируем объект с резулатами рассчетов валют для отправки на фронт

  res.status(200).send('Данные успешно обновлены'); // отправить на фронт!!!
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

