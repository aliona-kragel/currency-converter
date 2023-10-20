// полученные данные из api трансформирует в объект вида {RU:244, RV:3234}
export const transformCurrencyDataToRates = (data) => {
  const rates = {};
  const usdId = 431;
  const base = data.find(({ Cur_ID }) => Cur_ID === usdId).Cur_OfficialRate;

  data.forEach(currency => {
    const { Cur_Abbreviation, Cur_OfficialRate } = currency;
    rates[Cur_Abbreviation] = Number((base / Cur_OfficialRate).toFixed(4));
  });
  rates['BYN'] = base;

  return rates;
}

//создает новый obj из первоначального obj из api с измененными св-вами
export const getShortedCurrencies = (data) => {
  return data.map(({ Cur_ID, Cur_Abbreviation, Cur_Name }) =>
  ({
    id: Cur_ID,
    name: Cur_Name,
    abbr: Cur_Abbreviation
  }));
}
