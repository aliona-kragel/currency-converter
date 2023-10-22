import express from 'express';
import cors from 'cors';
import { currencyApi } from './api/index.js';
import { getShortedCurrencies, calculateRate, convertAmount, findBaseRate, generateRates } from './helpers/index.js';
import { getDataFromFirestore, sendDataToFirestore } from './firebase/index.js';
import { initializeApp } from "firebase/app";
import { COLLECTION_NAME, DOCUMENT_ID, firebaseConfig } from "./firebase/config.js";
import { getFirestore } from 'firebase/firestore';

// todo: добавить таймер на проверку свежих данных
// todo: (optional!) апи для таблицы
// TODO: при открытии страницы сделать запрос на контент для попапа /ShortedCurrencies 

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

const fetchAndStoreCurrencies = async () => {
  try {
    const res = await currencyApi.getCurrenciesList();

    if (res && Array.isArray(res)) {
      await sendDataToFirestore(COLLECTION_NAME, DOCUMENT_ID, { currencyData: res });
      console.log('Currencies data successfully stored in Firestore');
    } else {
      console.error('Received invalid currencies data');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
fetchAndStoreCurrencies();

app.get('/ShortedCurrencies', async (req, res) => {
  try {
    const { currencyData } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);
    if (currencyData && Array.isArray(currencyData)) {
      const shortedCurrencies = getShortedCurrencies(currencyData);
      res.json(shortedCurrencies);
    } else {
      res.status(404).json({ error: 'Currency data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Currencies', async (req, res) => {
  try {
    const { currencyData } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);

    if (currencyData && Array.isArray(currencyData)) {
      res.json(currencyData);
    } else {
      res.status(404).json({ message: 'Document not found in DB' });
    }
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
})

//data from client to recalculate currency
app.post('/UpdateCurrencies', async (req, res) => {
  try {
    const changedCurrency = req.body;
    const { currencyData } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);
    const baseRate = findBaseRate(changedCurrency.abbr, currencyData);
    const rates = generateRates(baseRate, currencyData);

    const result = currencyData.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => ({
      id: Cur_ID,
      abbr: Cur_Abbreviation,
      name: Cur_Name,
      amount: Cur_Abbreviation === changedCurrency.abbr ? changedCurrency.amount : convertAmount(changedCurrency.amount, rates[Cur_Abbreviation])
    }));

    const response = {
      message: 'Data updated successfully',
      data: result,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});

