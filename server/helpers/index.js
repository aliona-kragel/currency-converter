export const calculateRate = (baseRate, itemRate, scale) => Number((baseRate / itemRate * scale).toFixed(4));

export const adjustCurrency = (id, name, abbr) => ({ id, name, abbr })

export const getShortedCurrencies = (data) =>
  data.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => adjustCurrency(Cur_ID, Cur_Name, Cur_Abbreviation));

export const convertAmount = (amount, rate) => (amount * rate);

export const findBaseRate = (abbr, currencyData) => {
  const currency = currencyData.find(({ Cur_Abbreviation }) => Cur_Abbreviation === abbr);
  return currency ? currency.Cur_OfficialRate : 0;
}

export const generateRates = (baseRate, currencyData) => {
  const rates = {};
  currencyData.forEach(({ Cur_Abbreviation, Cur_OfficialRate, Cur_Scale }) => {
    rates[Cur_Abbreviation] = calculateRate(baseRate, Cur_OfficialRate, Cur_Scale);
  });
  rates['BYN'] = baseRate;    // add BYN rates, because banking API without BYN
  return rates;
}