import express from 'express';
import cors from 'cors';
import { currencyApi } from './api/index.js';
import { getShortedCurrencies, calculateRate, convertAmount } from './helpers/index.js';

// todo: добавить валидационные ошибки/проверки на валидные запросы => спросить чат гпт на проверки
// todo: метод post принимать данные и отправлять
// todo: подключить бд
// todo: добавить таймер на проверку свежих данных
// todo: (optional!) апи для таблицы
// TODO: при открытии страницы сделать запрос на контент для попапа /ShortedCurrencies 

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

//возвращает  из фронта данные изменненной валюты, чтобы пересчитать
app.post('/UpdateCurrencies', (req, res) => {
  const changedCurrency = req.body; // updateCurrency - то что вводили 
  const baseRate = allCurrencies.find(({ Cur_Abbreviation }) => Cur_Abbreviation === changedCurrency.abbr).Cur_OfficialRate; // ищем rate валюты которую изменили

  const rates = {};
  allCurrencies.forEach(({ Cur_Abbreviation, Cur_OfficialRate, Cur_Scale }) => {
    rates[Cur_Abbreviation] = calculateRate(baseRate, Cur_OfficialRate, Cur_Scale);
  }); // генерируем объект с рейтами всех валют
  rates['BYN'] = baseRate; // добавляем BYN рейт валюту, потому что в апи не приходит BYN 

  const result = allCurrencies.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => {
    if (Cur_Abbreviation === changedCurrency.abbr) {
      return ({
        id: Cur_ID,
        abbr: Cur_Abbreviation,
        name: Cur_Name,
        amount: changedCurrency.amount
      })
    }

    return ({
      id: Cur_ID,
      abbr: Cur_Abbreviation,
      name: Cur_Name,
      amount: convertAmount(changedCurrency.amount, rates[Cur_Abbreviation])
    })
  });

  const response = {
    message: 'Данные успешно обновлены',
    data: result,
  };
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

