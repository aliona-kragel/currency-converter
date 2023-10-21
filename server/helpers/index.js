export const calculateRate = (baseRate, itemRate, scale) => Number((baseRate / itemRate * scale).toFixed(4));

export const adjustCurrency = (id, name, abbr) => ({ id, name, abbr })

export const getShortedCurrencies = (data) =>
  data.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) => adjustCurrency(Cur_ID, Cur_Name, Cur_Abbreviation));

export const convertAmount = (amount, rate) => (amount * rate)