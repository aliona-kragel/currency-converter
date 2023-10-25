import express from 'express';
import cors from 'cors';
import { currencyApi } from './api/index.js';
import { getShortedCurrencies, convertAmount, findBaseRate, generateRates, shouldUpdateData, getChangedCurrScale } from './helpers/index.js';
import { getDataFromFirestore, sendDataToFirestore } from './firebase/index.js';
import { initializeApp } from "firebase/app";
import { COLLECTION_NAME, DOCUMENT_ID, getFirebaseConfig } from "./firebase/config.js";
import { getFirestore } from 'firebase/firestore';
import { config } from 'dotenv';

console.log('--------------------');
console.log('start config()');
console.log('--------------------');

config();

console.log('--------------------');
console.log('end config()');
console.log('--------------------');

// Initialize Firebase

console.log('--------------------');
console.log('start initializeApp()');
console.log('--------------------');

const firebaseApp = initializeApp(getFirebaseConfig());

console.log('--------------------');
console.log('start initializeApp()');
console.log('--------------------');

export const db = getFirestore(firebaseApp);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const getDataFromBank = async () => {
  console.log('--------------------');
  console.log('trying to get data from bank');
  console.log('--------------------');
  try {
    const res = await currencyApi.getCurrenciesList();
    console.log('--------------------');
    console.log('data from bank');
    console.log(res);
    console.log('--------------------');
    if (res && Array.isArray(res)) {
      await sendDataToFirestore(COLLECTION_NAME, DOCUMENT_ID, { currencyData: res, lastUpdated: Date.now() });
      return res;
    }
  } catch (error) {
    console.log('--------------------');
    console.log('error from getting data from bank');
    console.log('--------------------');
    res.status(500).json({ error: 'Internal server error' });
  }
}

const checkActualData = async () => {
  console.log('--------------------');
  console.log('get data from firestore');
  console.log('--------------------');
  const { currencyData, lastUpdated } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);
  console.log('--------------------');
  console.log('check should data be updated');
  console.log('--------------------');
  if (shouldUpdateData(lastUpdated, currencyData)) {
    console.log('--------------------');
    console.log('data should be updated');
    console.log('--------------------');
    await getDataFromBank();
  }
}

checkActualData();

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
    const { currencyData, lastUpdated } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);
    const shouldUpdate = shouldUpdateData(lastUpdated, currencyData);
    const data = shouldUpdate ? await getDataFromBank() : currencyData;
    if (currencyData && Array.isArray(currencyData)) {
      res.json(data);
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
    const { currencyData, lastUpdated } = await getDataFromFirestore(COLLECTION_NAME, DOCUMENT_ID);
    const shouldUpdate = shouldUpdateData(lastUpdated, currencyData); // нужно ли обновить?
    const data = shouldUpdate ? await getDataFromBank() : currencyData; // получаем актуальные данные, если нужно
    const changedCurrencyScale = getChangedCurrScale(data, changedCurrency.abbr);

    const baseRate = findBaseRate(changedCurrency.abbr, data);
    const rates = generateRates(baseRate, data);
    const result = data.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => ({
      id: Cur_ID,
      abbr: Cur_Abbreviation,
      name: Cur_Name,
      amount: Cur_Abbreviation === changedCurrency.abbr ? changedCurrency.amount : convertAmount(changedCurrency.amount, rates[Cur_Abbreviation], changedCurrencyScale)
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

